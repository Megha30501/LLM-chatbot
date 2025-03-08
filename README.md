# Therapy API

This API provides authentication and therapy session management using Flask and Firebase Firestore. Users can sign up, log in, start a therapy session, and chat with an AI-powered assistant.

## Features

- User authentication (Signup, Login) with JWT token
- Protected routes requiring authentication
- Therapy session management
- AI-powered chat functionality

## Technologies Used

- Flask
- Firebase Firestore
- JWT (JSON Web Token) Authentication
- Bcrypt for password hashing
- dotenv for environment variables

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Megha30501/LLM-chatbot
   cd Backend

2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   
3. Set up environment variables:
- Create a .env file in the project root and add:
  ```sh
  SECRET_KEY=your_secret_key
  DEEPSEEK_API_KEY = deepseek_api_key

4. Run the Flask application:
   ```sh
   python main.py

## API Endpoints

### 1. Signup

- **Endpoint:** `POST /signup`
- **Description:** Registers a new user.
- **Request Headers:** None
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }

### 2. Login

- **Endpoint:** `POST /login`
- **Description:** Logs in a user and returns a JWT token.
- **Request Headers:** None
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }

### 3. Start Therapy (Protected Route)

- **Endpoint:** `POST /start-therapy`
- **Description:** Starts a therapy session.
- **Request Headers:** Authorization: Bearer <token>
- **Request Body:**
  ```json
  {
  "session_type": "easy"  // or "hard"
  }
  
### 4. Chat (Protected Route)

- **Endpoint:** `POST /chat`
- **Description:** Sends a message to the AI assistant.
- **Request Headers:** Authorization: Bearer <token>
- **Request Body:**
  ```json
  {
  "message": "Hello, how can I manage stress?"
  }
  
