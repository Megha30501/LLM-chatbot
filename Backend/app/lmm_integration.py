import requests
from dotenv import load_dotenv
import os

load_dotenv()
HUGGINGFACE_API_KEY = os.getenv('HUGGINGFACE_API_KEY')

def call_llm_api(user_message):
    url = "https://api-inference.huggingface.co/models/facebook/opt-1.3b" 
    headers = {
        "Authorization": f"Bearer {HUGGINGFACE_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "inputs": user_message  # Input format for Hugging Face models
    }
    response = requests.post(url, json=payload, headers=headers)    
    if response.status_code == 200:
        return response.json()[0]['generated_text']
    else:
        raise Exception(f"Error calling Hugging Face API: {response.status_code}, {response.text}")

