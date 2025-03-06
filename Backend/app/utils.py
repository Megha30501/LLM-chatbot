import requests
import os
from dotenv import load_dotenv

load_dotenv()

def call_llm_api(user_message):
    url = "https://openrouter.ai/api/v1"
    api_key = os.getenv("OPENAI_API_KEY")
    
    if not api_key:
        raise ValueError("API key not found. Please ensure OPENAI_API_KEY is set in the .env file.")
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "deepseek/deepseek-r1:free",
        "messages": [{"role": "user", "content": user_message}]
    }
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 200:
        return response.json()['choices'][0]['message']['content']
    else:
        raise Exception(f"Error calling LLM API: {response.status_code}, {response.text}")
