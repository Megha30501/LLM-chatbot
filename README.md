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

<img width="839" alt="image" src="https://github.com/user-attachments/assets/7dc1a2ab-1162-4ba8-a798-63c53e3bbdff" />

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

<img width="839" alt="image" src="https://github.com/user-attachments/assets/1c51d865-afea-4cf0-9a2e-6f09fc91638a" />

### 3. Chat (Protected Route)

- **Endpoint:** `POST /chat`
- **Description:** Sends a message to the AI assistant.
- **Request Headers:** Authorization: Bearer <token>
- **Request Body:**
  ```json
  {
  "message": "How are you feeling today?",
  "session_type": "hard"
  }

 
<img width="839" alt="Screenshot 2025-03-21 at 1 48 13 PM" src="https://github.com/user-attachments/assets/a9a5c8ba-eeb5-4dd3-be6f-60d7734306c5" />
