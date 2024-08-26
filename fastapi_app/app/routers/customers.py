from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal_sqlserver
from ..models import Customer
from ..schemas import CustomerBase

router = APIRouter()

def get_db():
    db = SessionLocal_sqlserver()
    try:
        yield db
    finally:
        db.close()

# Create a new customer
@router.post("/", response_model=CustomerBase)
def create_customer(customer: CustomerBase, db: Session = Depends(get_db)):
    db_customer = Customer(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

# Read all customers
@router.get("/", response_model=list[CustomerBase])
def read_customers(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Customer).offset(skip).limit(limit).all()

# Read a specific customer by ID
@router.get("/{customer_id}", response_model=CustomerBase)
def read_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
    if customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

# Update a customer
@router.put("/{customer_id}", response_model=CustomerBase)
def update_customer(customer_id: int, customer: CustomerBase, db: Session = Depends(get_db)):
    db_customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    for key, value in customer.dict().items():
        setattr(db_customer, key, value)
    db.commit()
    db.refresh(db_customer)
    return db_customer

# Delete a customer
@router.delete("/{customer_id}")
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    db_customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    db.delete(db_customer)
    db.commit()
    return {"detail": "Customer deleted successfully"}
