'use client';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    age: '',
    blood_pressure: '',
    specific_gravity: '',
    albumin: '',
    sugar: '',
    red_blood_cells: 'normal',
    pus_cell: 'normal',
    pus_cell_clumps: 'notpresent',
    bacteria: 'notpresent',
    blood_glucose_random: '',
    blood_urea: '',
    serum_creatinine: '',
    sodium: '',
    potassium: '',
    haemoglobin: '',
    packed_cell_volume: '',
    white_blood_cell_count: '',
    red_blood_cell_count: '',
    hypertension: 'no',
    diabetes_mellitus: 'no',
    coronary_artery_disease: 'no',
    appetite: 'good',
    peda_edema: 'no',
    aanemia: 'no',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error('Error:', error);
      setPrediction({ status: 'error', message: 'Failed to get prediction' });
    }

    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="container">
      <h1 style={{textAlign:"center", marginTop:"30px"}}>Kidney Disease Prediction</h1>

      <form onSubmit={handleSubmit} className="form" style={{marginTop:"50px"}}>
        {[
          "age",
          "blood_pressure",
          "specific_gravity",
          "albumin",
          "sugar",
          "blood_glucose_random",
          "blood_urea",
          "serum_creatinine",
          "sodium",
          "potassium",
          "haemoglobin",
          "packed_cell_volume",
          "white_blood_cell_count",
          "red_blood_cell_count",
        ].map((field) => (
          <div className="form-group" key={field}>
            <label>{field === "blood_pressure"
                    ? "Blood Pressure (Diastolic)"
                    : field.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}</label>
            <input
              type="number"
              step="any"
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              required
            />
          </div>
        ))}

        <div className="form-group">
            <label>Red Blood Cells</label>
            <select name="red_blood_cells" value={formData.red_blood_cells} onChange={handleInputChange}>
                <option value="normal">Normal</option>
                <option value="abnormal">Abnormal</option>
            </select>
        </div>

        <div className="form-group">
            <label>Pus Cell</label>
            <select name="pus_cell" value={formData.pus_cell} onChange={handleInputChange}>
                <option value="normal">Normal</option>
                <option value="abnormal">Abnormal</option>
            </select>
        </div>

        {[
          "pus_cell_clumps",
          "bacteria",
          "hypertension",
          "diabetes_mellitus",
          "coronary_artery_disease",
          "peda_edema",
          "aanemia",
        ].map((field) => (
            <div className="form-group" key={field}>
                <label>{field.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}</label>
                <select name={field} value={formData[field]} onChange={handleInputChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>
        ))}

        <div className="form-group">
            <label>Appetite</label>
            <select name="appetite" value={formData.appetite} onChange={handleInputChange}>
                <option value="good">Good</option>
                <option value="poor">Poor</option>
            </select>
        </div>

        <button type="submit" className="button" disabled={loading}>
            {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

        {prediction && (
            <div className="result" style={{display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"center",textAlign:"start"}}>
                <h2 style={{}}>Result:</h2>
                {prediction.status === "success" ? (
                    <div>
                        <p>Prediction: "Chronic Kidney Disease"
                            {prediction.prediction === 1 ? "Chronic Kidney Disease" : "No Kidney Disease"}
                        </p>
                        <p>Probability: 
                            {(prediction.probability[1] * 100).toFixed(2)}%
                        </p>
                    </div>
                ) : (
                    <p className="error">Error: {prediction.message}</p>
                )} 
            </div>
        )} 

        <style>
            {`
            .container {
                min-height: 100vh;
                padding: 20px;
                font-family: Arial, sans-serif;
            }
            h1 {
                font-size: 24px;
                font-weight: bold;
                margin-top: 20px;
                margin-bottom:"500px";
                text-decoration: underline;
                text-underline-offset: 10px;
            }
            .form {
                max-width: 400px;
                margin: auto;
                margin-bottom:"500px"
            }
            .form-group {
                margin-bottom: 15px;
                display: flex;
                justify-content:space-between;
            }
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
            }
            .form-group input, .form-group select {
                width: 100px;
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            .button {
                width: 100%;
                padding: 10px;
                background-color: black;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            .button:hover {
                background-color: grey;
            }
            .result {
                margin-top: 20px;
            }
            .result h2 {
                font-size: 18px;
                font-weight: bold;
            }
            .error {
                color: red;
            }
            `}
        </style>
    </main>
  );
}
