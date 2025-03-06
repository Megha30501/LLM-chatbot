import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK (if not already initialized)
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase_service_account.json")  
    firebase_admin.initialize_app(cred)

# Initialize Firestore Database
db = firestore.client()

# Collections
THERAPISTS_COLLECTION = "therapists"
CHAT_LOGS_COLLECTION = "chat_logs"
