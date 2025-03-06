from flask import  request, redirect, url_for, jsonify
from app import app, db 
import jwt
import bcrypt
from functools import wraps
from datetime import datetime, timedelta
from app.lmm_integration import call_llm_api
from dotenv import load_dotenv
import os

load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')

# Helper function to generate JWT
def generate_token(user_id):
    expiration = datetime.utcnow() + timedelta(hours=1)  # Token expires in 1 hour
    token = jwt.encode({'user_id': user_id, 'exp': expiration}, SECRET_KEY, algorithm="HS256")
    return token


# Authentication Middleware
def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]  # Bearer <token>
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        
        try:
            # Decode the token
            decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = decoded['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid!'}), 403
        
        return f(current_user, *args, **kwargs)
    
    return decorated_function

# 1. Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    # Check if email and password are provided
    if not email or not password:
        return jsonify({'message': 'Email and password are required!'}), 400

    # Check if the user already exists
    user_ref = db.collection('users').where('email', '==', email).get()
    if len(user_ref) > 0:
        return jsonify({'message': 'User already exists!'}), 400

    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Store the new user in Firestore
    db.collection('users').add({
        'email': email,
        'password': hashed_password.decode('utf-8')  # Decode the hashed password to string
    })

    return jsonify({'message': 'User created successfully!'}), 201


# 2. Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Get JSON data from the request

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required!'}), 400

    # Retrieve the user from Firestore
    user_ref = db.collection('users').where('email', '==', email).get()
    if len(user_ref) == 0:
        return jsonify({'message': 'User not found!'}), 404

    # Check if the password is correct
    stored_password = user_ref[0].get('password')
    if not bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
        return jsonify({'message': 'Incorrect password!'}), 400

    # Generate JWT token
    user_id = user_ref[0].id  # Get the user_id (Firestore document ID)
    token = generate_token(user_id)  # Generate the token

    # Print the token for debugging
    print("Generated Token:", token)

    return jsonify({'message': 'User logged in successfully!', 'token': token}), 200

#3. Start Therapy Route (protected)
@app.route('/start-therapy', methods=['POST'])
@token_required
def start_therapy(current_user):
    data = request.get_json()
    session_type = data.get('session_type')

    if session_type not in ['easy', 'hard']:
        return jsonify({'message': 'Invalid session type!'}), 400

    # Logic to start a therapy session based on session_type
    session_id = f"session_{current_user}_{session_type}_{datetime.utcnow().isoformat()}"

    # Save the session info in Firestore (optional, depending on your design)
    db.collection('sessions').add({
        'user_id': current_user,
        'session_type': session_type,
        'session_id': session_id,
        'status': 'active',
        'start_time': datetime.utcnow(),
    })

    return jsonify({'message': 'Session started successfully', 'session_id': session_id}), 200

# 4. Chat Route (protected)
@app.route('/chat', methods=['POST'])
@token_required
def chat(current_user):
    if not request.is_json: 
        return jsonify({"error": "Request must be JSON"}), 400

    user_message = request.json.get('message')

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    llm_response = call_llm_api(user_message)

    # Return the LLM response to the client
    return jsonify({"response": llm_response}), 200