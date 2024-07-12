# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routers import admin, file, folder

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin.router)
app.include_router(file.router)
app.include_router(folder.router)

app.mount("/uploads", StaticFiles(directory="app/uploads"), name="uploads")
app.mount("/", StaticFiles(directory="../docs", html=True), name="uploads")
