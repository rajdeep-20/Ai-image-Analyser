# AI Image Analyzer

This is a full-stack web application that allows users to upload an image and receive an AI-generated analysis, including a descriptive caption and a list of identified labels. The project is built with a modern microservices architecture, separating the frontend, backend, and machine learning components for scalability and maintainability.

## Features

* **Image Upload:** A simple interface to select and upload image files.
* **AI-Powered Analysis:** Utilizes Hugging Face transformer models for:
  * **Image Captioning:** Generates a human-like sentence describing the image.
  * **Object Recognition:** Identifies and labels objects within the image.
* **Analysis History:** A dedicated page to view a log of all past analyses.

## Tech Stack

* **Frontend:** React (with Vite) & `react-router-dom`
* **Backend:** Node.js & Express
* **ML Service:** Python & FastAPI
* **Database:** MongoDB
<!-- * **Containerization:** Docker & Docker Compose -->

<!-- ##  Screenshots

*(Add your application screenshots here. You can drag and drop them into the GitHub editor later.)* -->

## Running the Project

There are two ways to run this application: locally using Node/Python directly, or with Docker.

### 1. Running Locally

You will need to open **three separate terminals**, one for each service.

**Terminal 1: Start the ML Service**

```
# Navigate to the ml-service folder
cd ml-service

# Run the server
uvicorn main:app --host 0.0.0.0 --port 8001```


```


**Terminal 2: Start the Backend**

```# Navigate to the backend folder
cd backend

# Run the server
npm start```
```

**Terminal 3: Start the Frontend Service**

```
# Navigate to the frontend folder
cd frontend

# Run the dev server
npm run dev```
```


