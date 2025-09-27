from dotenv import load_dotenv
from passlib.context import CryptContext  # Add this import
import os

load_dotenv()

# Required environment variables
env_vars = ["DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"]

missing = [var for var in env_vars if not os.getenv(var)]
if missing:
    raise ValueError(f"Missing env vars: {', '.join(missing)}")

database = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
port = os.getenv("DB_PORT")

DATABASE_URL = f"postgresql://{db_user}:{password}@{host}:{port}/{database}"

# REMOVE your custom PasswordContext class entirely and replace with:
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-super-secret-jwt-key-change-this-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Vapi Configuration
VAPI_API_KEY = os.getenv("VAPI_API_KEY")
VAPI_WEBHOOK_URL = os.getenv("VAPI_WEBHOOK_URL", "https://your-domain.com/vapi/webhook")

# Application Settings
APP_HOST = os.getenv("APP_HOST", "localhost")
APP_PORT = int(os.getenv("APP_PORT", "8000"))
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")