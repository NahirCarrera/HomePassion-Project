from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal_sqlserver
from ..models import CustomerFeedback
from ..schemas import CustomerFeedbackBase

router = APIRouter()

def get_db():
    db = SessionLocal_sqlserver()
    try:
        yield db
    finally:
        db.close()

# Create a new customer feedback
@router.post("/", response_model=CustomerFeedbackBase)
def create_customer_feedback(feedback: CustomerFeedbackBase, db: Session = Depends(get_db)):
    db_feedback = CustomerFeedback(**feedback.dict())
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback

# Read all customer feedbacks
@router.get("/", response_model=list[CustomerFeedbackBase])
def read_customer_feedbacks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(CustomerFeedback).order_by(CustomerFeedback.feedback_id).offset(skip).limit(limit).all()

# Read a specific customer feedback by ID
@router.get("/{feedback_id}", response_model=CustomerFeedbackBase)
def read_customer_feedback(feedback_id: int, db: Session = Depends(get_db)):
    feedback = db.query(CustomerFeedback).filter(CustomerFeedback.feedback_id == feedback_id).first()
    if feedback is None:
        raise HTTPException(status_code=404, detail="Feedback not found")
    return feedback

# Update a customer feedback
@router.put("/{feedback_id}", response_model=CustomerFeedbackBase)
def update_customer_feedback(feedback_id: int, feedback: CustomerFeedbackBase, db: Session = Depends(get_db)):
    db_feedback = db.query(CustomerFeedback).filter(CustomerFeedback.feedback_id == feedback_id).first()
    if db_feedback is None:
        raise HTTPException(status_code=404, detail="Feedback not found")
    for key, value in feedback.dict().items():
        setattr(db_feedback, key, value)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback

# Delete a customer feedback
@router.delete("/{feedback_id}")
def delete_customer_feedback(feedback_id: int, db: Session = Depends(get_db)):
    db_feedback = db.query(CustomerFeedback).filter(CustomerFeedback.feedback_id == feedback_id).first()
    if db_feedback is None:
        raise HTTPException(status_code=404, detail="Feedback not found")
    db.delete(db_feedback)
    db.commit()
    return {"detail": "Feedback deleted successfully"}
