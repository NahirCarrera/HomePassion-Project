from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal_oracle
from ..models import Category
from ..schemas import CategoryBase

router = APIRouter()

# Dependency to get the database session
def get_db():
    db = SessionLocal_oracle()
    try:
        yield db
    finally:
        db.close()

# Create a new category
@router.post("/", response_model=CategoryBase)
def create_category(category: CategoryBase, db: Session = Depends(get_db)):
    db_category = Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

# Read all categories
@router.get("/", response_model=list[CategoryBase])
def read_categories(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    categories = db.query(Category).offset(skip).limit(limit).all()
    return categories

# Read a specific category by ID
@router.get("/{category_id}", response_model=CategoryBase)
def read_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.category_id == category_id).first()
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

# Update a category
@router.put("/{category_id}", response_model=CategoryBase)
def update_category(category_id: int, category: CategoryBase, db: Session = Depends(get_db)):
    db_category = db.query(Category).filter(Category.category_id == category_id).first()
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    for key, value in category.dict().items():
        setattr(db_category, key, value)
    db.commit()
    db.refresh(db_category)
    return db_category

# Delete a category
@router.delete("/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db)):
    db_category = db.query(Category).filter(Category.category_id == category_id).first()
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(db_category)
    db.commit()
    return {"detail": "Category deleted successfully"}
