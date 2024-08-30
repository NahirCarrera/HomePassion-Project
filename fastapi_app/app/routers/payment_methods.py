from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import SessionLocal_sqlserver
from ..models import PaymentMethod
from ..schemas import PaymentMethodBase

router = APIRouter()

def get_db():
    db = SessionLocal_sqlserver()
    try:
        yield db
    finally:
        db.close()

# Create a new payment method
@router.post("/", response_model=PaymentMethodBase)
def create_payment_method(payment_method: PaymentMethodBase, db: Session = Depends(get_db)):
    db_payment_method = PaymentMethod(**payment_method.dict())
    db.add(db_payment_method)
    db.commit()
    db.refresh(db_payment_method)
    return db_payment_method

# Read all payment methods
@router.get("/", response_model=List[PaymentMethodBase])
def read_payment_methods(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(PaymentMethod).offset(skip).limit(limit).all()

# Read a specific payment method by ID
@router.get("/{payment_method_id}", response_model=PaymentMethodBase)
def read_payment_method(payment_method_id: int, db: Session = Depends(get_db)):
    payment_method = db.query(PaymentMethod).filter(PaymentMethod.payment_method_id == payment_method_id).first()
    if payment_method is None:
        raise HTTPException(status_code=404, detail="Payment method not found")
    return payment_method

# Update a payment method
@router.put("/{payment_method_id}", response_model=PaymentMethodBase)
def update_payment_method(payment_method_id: int, payment_method: PaymentMethodBase, db: Session = Depends(get_db)):
    db_payment_method = db.query(PaymentMethod).filter(PaymentMethod.payment_method_id == payment_method_id).first()
    if db_payment_method is None:
        raise HTTPException(status_code=404, detail="Payment method not found")
    for key, value in payment_method.dict(exclude_unset=True).items():
        setattr(db_payment_method, key, value)
    db.commit()
    db.refresh(db_payment_method)
    return db_payment_method

# Delete a payment method
@router.delete("/{payment_method_id}", response_model=dict)
def delete_payment_method(payment_method_id: int, db: Session = Depends(get_db)):
    db_payment_method = db.query(PaymentMethod).filter(PaymentMethod.payment_method_id == payment_method_id).first()
    if db_payment_method is None:
        raise HTTPException(status_code=404, detail="Payment method not found")
    db.delete(db_payment_method)
    db.commit()
    return {"detail": "Payment method deleted successfully"}
