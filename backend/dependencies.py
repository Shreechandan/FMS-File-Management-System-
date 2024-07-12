from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel
from app.crud import get_admin_by_username
from app.schemas import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="admin/token")

SECRET_KEY = "fmsproject"
ALGORITHM = "HS256"


class TokenData(BaseModel):
	username: str | None = None


async def get_current_admin(token: str = Depends(oauth2_scheme)):
	credentials_exception = HTTPException(
		status_code=status.HTTP_401_UNAUTHORIZED,
		detail="Could not validate credentials",
		headers={"WWW-Authenticate": "Bearer"},
	)
	try:
		payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
		print(payload)
		username: str = payload.get("sub")  # type: ignore
		if username is None:
			raise credentials_exception
		token_data = TokenData(username=username)
	except JWTError as e:
		print(e)
		raise credentials_exception
	admin = await get_admin_by_username(username=token_data.username) # type: ignore
	if admin is None:
		print("No Admin")
		raise credentials_exception
	return admin
