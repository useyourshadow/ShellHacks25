# Use an official Python image
FROM python:3.13-slim

# Install dependencies for Rust + building wheels
RUN apt-get update && \
    apt-get install -y curl build-essential git && \
    rm -rf /var/lib/apt/lists/*

# Install Rust toolchain
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:$PATH"
RUN rustup default stable

# Set working directory
WORKDIR /app

# Copy requirements first for caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the rest of your app
COPY . .

# Expose the port
EXPOSE 8000

# Command to run the app (FastAPI example)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
