from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal_mysql
from ..models import Campaign
from ..schemas import CampaignBase

router = APIRouter()

def get_db():
    db = SessionLocal_mysql()
    try:
        yield db
    finally:
        db.close()

# Create a new campaign
@router.post("/", response_model=CampaignBase)
def create_campaign(campaign: CampaignBase, db: Session = Depends(get_db)):
    db_campaign = Campaign(**campaign.dict())
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)
    return db_campaign

# Read all campaigns
@router.get("/", response_model=list[CampaignBase])
def read_campaigns(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Campaign).offset(skip).limit(limit).all()

# Read a specific campaign by ID
@router.get("/{campaign_id}", response_model=CampaignBase)
def read_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.campaign_id == campaign_id).first()
    if campaign is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign

# Update a campaign
@router.put("/{campaign_id}", response_model=CampaignBase)
def update_campaign(campaign_id: int, campaign: CampaignBase, db: Session = Depends(get_db)):
    db_campaign = db.query(Campaign).filter(Campaign.campaign_id == campaign_id).first()
    if db_campaign is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    for key, value in campaign.dict().items():
        setattr(db_campaign, key, value)
    db.commit()
    db.refresh(db_campaign)
    return db_campaign

# Delete a campaign
@router.delete("/{campaign_id}")
def delete_campaign(campaign_id: int, db: Session = Depends(get_db)):
    db_campaign = db.query(Campaign).filter(Campaign.campaign_id == campaign_id).first()
    if db_campaign is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    db.delete(db_campaign)
    db.commit()
    return {"detail": "Campaign deleted successfully"}
