from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal_postgres
from ..models import City
from ..schemas import CityBase

router = APIRouter()

def get_db():
    db = SessionLocal_postgres()
    try:
        yield db
    finally:
        db.close()

# Create a new city
@router.post("/", response_model=CityBase)
def create_city(city: CityBase, db: Session = Depends(get_db)):
    db_city = City(**city.dict(exclude_unset=True))
    db.add(db_city)
    db.commit()
    db.refresh(db_city)
    return db_city

# Read all cities
@router.get("/", response_model=list[CityBase])
def read_cities(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    cities = db.query(City).offset(skip).limit(limit).all()
    return cities

# Read a specific city by ID
@router.get("/{city_id}", response_model=CityBase)
def read_city(city_id: int, db: Session = Depends(get_db)):
    city = db.query(City).filter(City.city_id == city_id).first()
    if city is None:
        raise HTTPException(status_code=404, detail="City not found")
    return city

# Update a city
@router.put("/{city_id}", response_model=CityBase)
def update_city(city_id: int, city: CityBase, db: Session = Depends(get_db)):
    db_city = db.query(City).filter(City.city_id == city_id).first()
    if db_city is None:
        raise HTTPException(status_code=404, detail="City not found")
    for key, value in city.dict(exclude_unset=True).items():
        setattr(db_city, key, value)
    db.commit()
    db.refresh(db_city)
    return db_city

# Delete a city
@router.delete("/{city_id}")
def delete_city(city_id: int, db: Session = Depends(get_db)):
    db_city = db.query(City).filter(City.city_id == city_id).first()
    if db_city is None:
        raise HTTPException(status_code=404, detail="City not found")
    db.delete(db_city)
    db.commit()
    return {"detail": "City deleted successfully"}
