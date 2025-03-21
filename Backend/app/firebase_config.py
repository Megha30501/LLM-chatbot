import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('Backend/config/firebase_config.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

def create_chat_session(user_id, patient_persona):
    doc_ref = db.collection("sessions").document(user_id)
    doc_ref.set({
        'user_id': user_id,
        'patient_persona': patient_persona,
        'messages': []
    })
