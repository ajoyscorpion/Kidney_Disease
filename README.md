# Kidney Disease Prediction - FastAPI & Next.js

This project is a machine learning-based Kidney Disease Prediction system built using FastAPI for the backend and Next.js for the frontend.

## Features
- Trained a **Random Forest Classifier** on medical datasets to predict kidney disease based on patient data.
- Developed API endpoints for **model inference** using FastAPI.
- Integrated a **user-friendly web interface** with Next.js for data input and real-time predictions.
- Deployed the project for public access.

## Technologies Used
- **Frontend**: Next.js
- **Backend**: FastAPI
- **Machine Learning**: Random Forest Classifier
- **Deployment**: Render, Vercel

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Python 3.x
- Node.js

### Backend Setup (FastAPI)
```sh
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup (Next.js)
```sh
cd frontend
npm install
npm run dev
```

## Links
- **Live Demo**: [Deployed App](https://kidney-disease.vercel.app/)

## License
This project is licensed under the MIT License.
