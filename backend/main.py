from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
model = joblib.load("KidneyDiseaseRF.pkl")

expected_features = [
    "age", "blood_pressure", "specific_gravity", "albumin", "sugar",
    "red_blood_cells", "pus_cell", "pus_cell_clumps", "bacteria",
    "blood_glucose_random", "blood_urea", "serum_creatinine", "sodium",
    "potassium", "haemoglobin", "packed_cell_volume", "white_blood_cell_count",
    "red_blood_cell_count", "hypertension", "diabetes_mellitus",
    "coronary_artery_disease", "appetite", "peda_edema", "aanemia"
]

# Define the input data
class InputData(BaseModel):
    age: float
    blood_pressure: float
    specific_gravity: float
    albumin: float
    sugar: float
    red_blood_cells: str
    pus_cell: str
    pus_cell_clumps: str
    bacteria: str
    blood_glucose_random: float
    blood_urea: float
    serum_creatinine: float
    sodium: float
    potassium: float
    haemoglobin: float
    packed_cell_volume: float
    white_blood_cell_count: float
    red_blood_cell_count: float
    hypertension: str
    diabetes_mellitus: str
    coronary_artery_disease: str
    appetite: str
    peda_edema: str
    aanemia: str

@app.get("/")
def read_root():
    return {"message": "Kidney Disease Prediction"}

@app.post("/predict")
    # try:
        # Convert categorical features to numerical
    #     features = np.array([
    #         data.age,
    #         data.blood_pressure,
    #         data.specific_gravity,
    #         data.albumin,
    #         data.sugar,
    #         data.blood_glucose_random,
    #         data.blood_urea,
    #         data.serum_creatinine,
    #         data.sodium,
    #         data.potassium,
    #         data.haemoglobin,
    #         data.packed_cell_volume,
    #         data.white_blood_cell_count,
    #         data.red_blood_cell_count,
    #         1 if data.hypertension == 'yes' else 0,
    #         1 if data.diabetes_mellitus == 'yes' else 0,
    #         1 if data.coronary_artery_disease == 'yes' else 0,
    #         1 if data.appetite == 'good' else 0,
    #         1 if data.peda_edema == 'yes' else 0,
    #         1 if data.aanemia == 'yes' else 0,
    #         1 if data.red_blood_cells == 'abnormal' else 0,
    #         1 if data.pus_cell == 'abnormal' else 0,
    #         1 if data.bacteria == 'present' else 0,
    #         1 if data.pus_cell_clumps == 'present' else 0
    #     ])

    #     prediction = model.predict(features)[0]
    #     probability = model.predict_proba(features)[0].tolist()

    #     return {
    #         "prediction": int(prediction),
    #         'probability': probability,
    #         'status': 'success'
    #     }
    # except Exception as e:
    #     return {
    #         'error': str(e),
    #         'status': 'error'
    #     }
def predict(data: InputData):

    try:
        # Convert input data to DataFrame
        input_df = pd.DataFrame([data.dict()])  # Convert input data to DataFrame

        # Ensure column order matches the expected feature order
        # input_df = input_df[expected_features]

        # Convert categorical values to match training format (if necessary)
        categorical_columns = ["red_blood_cells", "pus_cell", "pus_cell_clumps", "bacteria", 
                                "hypertension", "diabetes_mellitus", "coronary_artery_disease", 
                                "appetite", "peda_edema", "aanemia"]

        for col in categorical_columns:
            input_df[col] = input_df[col].map({"yes": 1, "no": 0, "good": 1, "poor": 0, "normal": 1, "abnormal": 0})

        # Predict
        prediction = model.predict(input_df)
        probability = model.predict_proba(input_df)

        return {
            "status": "success",
            "prediction": int(prediction[0]),
            "probability": probability[0].tolist()
        }

    except Exception as e:
        return {
            'error': str(e),
            'status': 'error'
        }