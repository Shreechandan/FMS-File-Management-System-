# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY backend/requirements.txt .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY backend /app/backend

# Make sure the uploads directory exists
RUN mkdir -p /app/backend/uploads

# Expose the port the app runs on
EXPOSE 8000

# Set the working directory to backend
WORKDIR /app/backend

# Command to run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
