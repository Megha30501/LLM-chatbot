import firebase_admin
from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    cred = credentials.Certificate("/Users/milu/Desktop/LLM-chatbot/Backend/firebase_service_account.json")  
    firebase_admin.initialize_app(cred)

db = firestore.client()

# Collections
THERAPISTS_COLLECTION = "therapists"
CHAT_LOGS_COLLECTION = "chat_logs"
