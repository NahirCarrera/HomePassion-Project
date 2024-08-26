from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal_postgres
from ..models import Sale
from ..schemas import SaleBase

router = APIRouter()

def get_db():
    db = SessionLocal_postgres()
    try:
        yield db
    finally:
        db.close()

# Create a new sale
@router.post("/", response_model=SaleBase)
def create_sale(sale: SaleBase, db: Session = Depends(get_db)):
    db_sale = Sale(**sale.dict())
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)
    return db_sale

# Read all sales
@router.get("/")
def read_sales(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Sale).offset(skip).limit(limit).all()

# Read a specific sale by ID
@router.get("/{sale_id}", response_model=SaleBase)
def read_sale(sale_id: int, db: Session = Depends(get_db)):
    sale = db.query(Sale).filter(Sale.sale_id == sale_id).first()
    if sale is None:
        raise HTTPException(status_code=404, detail="Sale not found")
    return sale

# Update a sale
@router.put("/{sale_id}", response_model=SaleBase)
def update_sale(sale_id: int, sale: SaleBase, db: Session = Depends(get_db)):
    db_sale = db.query(Sale).filter(Sale.sale_id == sale_id).first()
    if db_sale is None:
        raise HTTPException(status_code=404, detail="Sale not found")
    for key, value in sale.dict().items():
        setattr(db_sale, key, value)
    db.commit()
    db.refresh(db_sale)
    return db_sale

# Delete a sale
@router.delete("/{sale_id}")
def delete_sale(sale_id: int, db: Session = Depends(get_db)):
    db_sale = db.query(Sale).filter(Sale.sale_id == sale_id).first()
    if db_sale is None:
        raise HTTPException(status_code=404, detail="Sale not found")
    db.delete(db_sale)
    db.commit()
    return {"detail": "Sale deleted successfully"}
