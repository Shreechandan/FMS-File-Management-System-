import shutil
from fastapi import APIRouter, Depends, UploadFile, File as FastAPIFile, HTTPException
from app.schemas import ResponseModel, User
from app.crud import add_file, delete_file, get_full_folder_path, retrieve_files_by_folder_id
from app.dependencies import get_current_admin

router = APIRouter(
    prefix="/files",
    tags=["files"],
)


@router.post("/", response_description="File data added into the database")
async def upload_file(folder_id: str, file: UploadFile = FastAPIFile(...), current_admin: User = Depends(get_current_admin)):
    if not current_admin:
        raise HTTPException(status_code=401, detail="Unauthorized")

    folder_path = await get_full_folder_path(folder_id)
    file_path = f"{folder_path}/{file.filename}" if folder_path else file.filename

    file_data = {
        "Name": file.filename,
        "FolderID": folder_id,
        "Path": file_path,  # Store the full file path
        "URL": f"/uploads/{file.filename}",
        "OwnerID": dict(current_admin)["username"]
    }

    new_file = await add_file(file_data)

    # Save the file to the server
    with open(f'app/uploads/{file.filename}', 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)

    return ResponseModel(data=new_file, message="File uploaded successfully")


@router.get("/{folder_id}/files", response_description="Files retrieved")
async def get_files_in_folder(folder_id: str):
    files = await retrieve_files_by_folder_id(folder_id)
    return ResponseModel(data=files, message="Files retrieved successfully")


@router.delete("/{file_id}", response_description="File deleted from the database")
async def delete_file_by_id(file_id: str, current_admin: User = Depends(get_current_admin)):
    if not current_admin:
        raise HTTPException(status_code=401, detail="Unauthorized")

    file, error_message = await delete_file(file_id)
    if file:
        return ResponseModel(file, f"File with id: {file_id} deleted successfully.")
    if error_message:
        raise HTTPException(
            status_code=500, detail=f"Error deleting file: {error_message}")
    return ResponseModel(file, f"No file found with id {file_id}.")
