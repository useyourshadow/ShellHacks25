FROM python:3.12-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    make \
    build-essential \
    portaudio19-dev \
    libsndfile1-dev \
    python3-dev \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Rust (for packages like pydantic-core)
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:$PATH"
RUN rustup default stable

# Set working directory
WORKDIR /app

# Copy Python requirements first
COPY requirements.txt .

# Upgrade pip and install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the rest of your app
COPY . .

# Expose port for FastAPI
EXPOSE 8000

# Run FastAPI with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
