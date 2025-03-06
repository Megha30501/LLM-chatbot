from pydantic import BaseModel

class TherapistCreate(BaseModel):
    email: str
    name: str

class ChatRequest(BaseModel):
    message: str
    patient_type: str  