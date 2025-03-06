from fastapi import FastAPI, Depends, HTTPException
from firebase_auth import get_current_user
from schemas import TherapistCreate, ChatRequest
from database import db, THERAPISTS_COLLECTION, CHAT_LOGS_COLLECTION
import openai
import os
from dotenv import load_dotenv
import datetime

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

app = FastAPI()

@app.post("/signup/")
def signup(therapist: TherapistCreate):
    therapist_ref = db.collection(THERAPISTS_COLLECTION).document(therapist.email)
    if therapist_ref.get().exists:
        raise HTTPException(status_code=400, detail="User already exists")

    therapist_ref.set({
        "email": therapist.email,
        "name": therapist.name
    })
    return {"message": "Therapist registered successfully"}

@app.post("/chat/")
def chat_with_llm(request: ChatRequest, user: dict = Depends(get_current_user)):
    patient_type = request.patient_type  # "easy" (Sam) or "hard"

    if patient_type == "easy":
        system_prompt = "You are Sam, a veteran with PTSD. Respond like a human patient."
    elif patient_type == "hard":
        system_prompt = "You are Aisha, a PTSD survivor with deep trauma. Respond cautiously."
    else:
        raise HTTPException(status_code=400, detail="Invalid patient type")

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ]
        )
        bot_response = response["choices"][0]["message"]["content"]

        # Store chat log in Firestore
        chat_ref = db.collection(CHAT_LOGS_COLLECTION).document()
        chat_ref.set({
            "email": user["email"],
            "user_message": request.message,
            "bot_response": bot_response,
            "timestamp": datetime.datetime.utcnow()
        })
        return {"response": bot_response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat processing error: {str(e)}")
    