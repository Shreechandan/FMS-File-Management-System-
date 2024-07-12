# app/routers/folder.py

from fastapi import APIRouter, Depends, HTTPException
from app.schemas import ResponseModel, User, folderSchema
from app.crud import add_folder, delete_folder, retrieve_files_by_folder_id, retrieve_folders, retrieve_folders_by_parent_id, search_folders_and_files
from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from app.dependencies import get_current_admin

router = APIRouter(
    prefix="/folders",
    tags=["folders"],
)


@router.post("/", response_description="Folder data added into the database")
async def add_folder_data(Folder: folderSchema = Body(...), current_admin: User = Depends(get_current_admin)):
    Folder = jsonable_encoder(Folder)
    new_Folder = await add_folder(Folder)  # type: ignore
    return ResponseModel(new_Folder, "Folder added successfully.")


@router.get("/", response_description="Folder retrieved")
async def get_folder():
    folder = await retrieve_folders()
    if folder:
        return ResponseModel(folder, "folder data retrieved successfully")
    return ResponseModel(folder, "Empty list returned")


@router.get("/{parent_id}", response_description="Folders retrieved by parent folder ID")
async def get_folders_by_parent_id(parent_id: str):
    folders = await retrieve_folders_by_parent_id(parent_id)
    files = await retrieve_files_by_folder_id(parent_id)
    if folders or files:
        return ResponseModel(folders + files, f"Folders with ParentfolderID {parent_id} retrieved successfully.")
    return ResponseModel(folders, f"No folders found with ParentfolderID {parent_id}.")


@router.delete("/{id}", response_description="Folder deleted by id")
async def delete_folder_by_id(id: str, current_admin: User = Depends(get_current_admin)):
    if not current_admin:
        raise HTTPException(status_code=401, detail="Unauthorized")

    folder = await delete_folder(id)
    if folder:
        return ResponseModel(folder, f"Folder with id: {id} deleted successfully.")
    return ResponseModel(folder, f"No folder found with id {id}.")


# Search ---------------------------
@router.get("/search/", response_description="Search folders and files by name")
async def search_folders_and_files_by_name(query: str):
    result = await search_folders_and_files(query)
    return ResponseModel(result, "Search results retrieved successfully")
