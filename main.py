from typing import Union
import os
from openai import OpenAI
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

app = FastAPI()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class HealthcareText(BaseModel):
    text: str

# Mount static files - serve from src directory
app.mount("/src", StaticFiles(directory="src"), name="src")

@app.get("/")
async def read_root():
    return FileResponse('index.html')


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.post("/analyze-fraud")
async def analyze_healthcare_fraud(healthcare_text: HealthcareText):
    """
    Analyze healthcare text for potential Fraud, Waste, or Abuse using ChatGPT
    """
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=500, detail="OpenAI API key not configured")
    
    try:
        prompt = f"""
        Analyze the following healthcare-related text for potential Fraud, Waste, or Abuse (FWA). 
        
        Text to analyze: "{healthcare_text.text}"
        
        Please evaluate this text and respond with:
        1. A risk assessment (LOW, MEDIUM, HIGH)
        2. Specific concerns identified (if any)
        3. Brief explanation of your assessment
        
        Focus on identifying patterns that might indicate:
        - Fraudulent billing practices
        - Wasteful resource usage
        - Abusive healthcare practices
        - Unnecessary procedures or services
        - Billing irregularities
        
        Provide a structured response.
        """
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a healthcare fraud detection expert. Analyze text for potential Fraud, Waste, or Abuse indicators."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.3
        )
        
        analysis = response.choices[0].message.content
        
        return {
            "input_text": healthcare_text.text,
            "analysis": analysis,
            "status": "success"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing text: {str(e)}")