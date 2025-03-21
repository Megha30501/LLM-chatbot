from flask import Flask
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)
CORS(app)
cred = credentials.Certificate('config/firebase_config.json')
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()


from app import routes

