from fastapi import APIRouter, HTTPException
from bson import ObjectId
from ..database import db_mongodb
from ..schemas import UserBase

router = APIRouter()

# Create a new user
@router.post("/", response_model=UserBase)
def create_user(user: UserBase):
    user_id = db_mongodb["Users"].insert_one(user.dict()).inserted_id
    return {"user_id": str(user_id)}

# Read all users
@router.get("/")
def read_users(skip: int = 0, limit: int = 10):
    users = db_mongodb["Users"].find().skip(skip).limit(limit)
    return list(users)

# Read a specific user by ID
@router.get("/{user_id}", response_model=UserBase)
def read_user(user_id: str):
    user = db_mongodb["Users"].find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Update a user
@router.put("/{user_id}", response_model=UserBase)
def update_user(user_id: str, user: UserBase):
    updated_user = db_mongodb["Users"].find_one_and_update(
        {"_id": ObjectId(user_id)},
        {"$set": user.dict()},
        return_document=True
    )
    if updated_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

# Delete a user
@router.delete("/{user_id}")
def delete_user(user_id: str):
    result = db_mongodb["Users"].delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted successfully"}
