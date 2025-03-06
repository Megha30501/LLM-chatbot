from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from firebase_admin import auth

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        decoded_token = auth.verify_id_token(token)
        return {"email": decoded_token["email"]}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired authentication token")