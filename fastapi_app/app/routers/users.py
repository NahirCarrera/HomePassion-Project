from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from ..database import db_mongodb
from ..schemas import UserBase
from typing import List

router = APIRouter()

def is_valid_objectid(id: str):
    return ObjectId.is_valid(id)

# Create a new user
@router.post("/", response_model=UserBase)
def create_user(user: UserBase):
    user_dict = user.dict()
    user_id = db_mongodb["users"].insert_one(user_dict).inserted_id
    user_dict["_id"] = str(user_id)
    return user_dict

# Read all users
@router.get("/", response_model=List[UserBase])
def read_users(skip: int = 0, limit: int = 10):
    users = db_mongodb["users"].find().skip(skip).limit(limit)
    return [{**user, "_id": str(user["_id"])} for user in users]

# Read a specific user by ID
@router.get("/{user_id}", response_model=UserBase)
def read_user(user_id: str):
    if not is_valid_objectid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID")
    user = db_mongodb["users"].find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user["_id"] = str(user["_id"])
    return user

# Update a user
@router.put("/{user_id}", response_model=UserBase)
def update_user(user_id: str, user: UserBase):
    if not is_valid_objectid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID")
    updated_user = db_mongodb["users"].find_one_and_update(
        {"_id": ObjectId(user_id)},
        {"$set": user.dict()},
        return_document=True
    )
    if updated_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    updated_user["_id"] = str(updated_user["_id"])
    return updated_user

# Delete a user
@router.delete("/{user_id}")
def delete_user(user_id: str):
    if not is_valid_objectid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID")
    result = db_mongodb["users"].delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted successfully"}
