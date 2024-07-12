# app/crud.py

from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient
from app.schemas import PyObjectId

client = AsyncIOMotorClient('mongodb://localhost:27017')
database = client.file_management_system
folders = database.get_collection("Folders")
files = database.get_collection("Files")
admins = database.get_collection("users")


async def get_admin_by_username(username: str):
    admin = await admins.find_one({"username": username})
    return admin


def Folder_helper(Folder) -> dict:
    return {
        "FolderID": str(Folder["_id"]),
        "Name": Folder["Name"],
        "ParentfolderID": Folder["ParentfolderID"],
        "Path": Folder["Path"],
        "CreatedAt": Folder["CreatedAt"],
        "UpdatedAt": Folder["UpdatedAt"],
        "OwnerID": Folder["OwnerID"],
    }


def File_helper(File) -> dict:
    return {
        "FileID": str(File["_id"]),
        "Name": File["Name"],
        "FolderID": File["FolderID"],
        "Path": File["Path"],
        "URL": File["URL"],
        "CreatedAt": File["CreatedAt"],
        "UpdatedAt": File["UpdatedAt"],
        "OwnerID": File["OwnerID"],
    }


# Update a student with a matching ID
async def update_student(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    student = await folders.find_one({"_id": PyObjectId(id)})
    if student:
        updated_student = await folders.update_one(
            {"_id": PyObjectId(id)}, {"$set": data}
        )
        if updated_student:
            return True
        return False


# Files CRUD ---------------------------------------------

# Retrieve files by folder ID
async def retrieve_files_by_folder_id(folder_id: str):
    files_list = []
    async for file in files.find({"FolderID": folder_id}):
        files_list.append(File_helper(file))
    return files_list


# Add a new file into the database
async def add_file(file_data: dict) -> dict:
    current_time = datetime.now()
    file_data['CreatedAt'] = current_time
    file_data['UpdatedAt'] = current_time
    file = await files.insert_one(file_data)
    new_file = await files.find_one({"_id": file.inserted_id})
    return File_helper(new_file)


# Delete a file from the database
async def delete_file(id: str):
    file = await files.find_one({"_id": PyObjectId(id)})
    if file:
        try:
            os.remove(f"app{file['URL']}")
        except FileNotFoundError:
            pass
        except Exception as e:
            return False, str(e)

        await files.delete_one({"_id": PyObjectId(id)})
        return True, None
    return False, "File not found"


# Folders CRUD ---------------------------------------------

# Retrieve all folder present in the database
async def retrieve_folders():
    folders_list = []
    async for folder in folders.find():
        folders_list.append(Folder_helper(folder))
    return folders_list


# Retrieve a folder by its ID
async def retrieve_folder_by_id(id: str):
    folder = await folders.find_one({"_id": PyObjectId(id)})
    if folder:
        return Folder_helper(folder)
    return None


# Retrieve all folders with a given ParentfolderID
async def retrieve_folders_by_parent_id(parent_id: str):
    folders_list = []
    async for folder in folders.find({"ParentfolderID": parent_id}):
        folders_list.append(Folder_helper(folder))
    return folders_list


# Add a new Folder into to the database
async def add_folder(folder_data: dict) -> dict:
    current_time = datetime.now()
    folder_data['CreatedAt'] = current_time
    folder_data['UpdatedAt'] = current_time

    folder_data['Path'] = await get_full_folder_path(folder_data["ParentfolderID"])

    folder = await folders.insert_one(folder_data)
    new_folder = await folders.find_one({"_id": folder.inserted_id})
    return Folder_helper(new_folder)


# Delete a folder and its files from the database
async def delete_folder(id: str):
    folder = await folders.find_one({"_id": PyObjectId(id)})
    if folder:
        # Delete all files in the folder
        async for file in files.find({"FolderID": id}):
            await delete_file(str(file["_id"]))

        await folders.delete_one({"_id": PyObjectId(id)})
        return True
    return False


# Search ---------------------

# Search for folders and files
# Search folders and files by name
async def search_folders_and_files(query: str):
    folders_list = []
    files_list = []

    async for folder in folders.find({"Name": {"$regex": query, "$options": "i"}}):
        folders_list.append(Folder_helper(folder))

    async for file in files.find({"Name": {"$regex": query, "$options": "i"}}):
        files_list.append(File_helper(file))

    return {"folders": folders_list, "files": files_list}


# Get Folder Path
async def get_full_folder_path(folder_id: str) -> str:
    if folder_id == "0":
        return "Root"

    folder = await retrieve_folder_by_id(folder_id)
    if folder:
        parent_folder_path = await get_full_folder_path(folder["ParentfolderID"])
        return f"{parent_folder_path}/{folder['Name']}"
    return ""
