#!/bin/bash
set -e  # Stop on first error

# Install system dependencies
apt-get update
apt-get install -y portaudio19-dev libsndfile1-dev build-essential curl git

# Install Rust
curl https://sh.rustup.rs -sSf | sh -s -- -y
export PATH="$HOME/.cargo/bin:$PATH"
rustup default stable

# Set writable Rust directories for Render
export CARGO_HOME=/tmp/cargo
export RUSTUP_HOME=/tmp/rustup
export PATH="$CARGO_HOME/bin:$PATH"

# Install Python packages
pip install --upgrade pip
pip install vapi-python
pip install -r requirements.txt
