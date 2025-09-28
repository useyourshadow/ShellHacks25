from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .lifespan import lifespan
from .routes import call  # import your call router

# Pass lifespan to FastAPI
app = FastAPI(lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
