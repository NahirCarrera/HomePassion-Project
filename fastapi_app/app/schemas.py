from pydantic import BaseModel
from typing import Optional, Dict
from datetime import date
from pydantic.networks import AnyUrl

# SQL Server
class CustomerBase(BaseModel):
    customer_name: str
    customer_email: str
    customer_phone: str
    customer_address: str

class CustomerFeedbackBase(BaseModel):
    feedback_text: str
    feedback_date: str
    customer_id: int
    feedback_order: int

# PostgreSQL
class ProvinceBase(BaseModel):
    province_name: str

class CityBase(BaseModel):
    city_id: Optional[int] = None
    city_name: str
    province: Optional[int] = None
    location: Optional[Dict] = None  # GeoJSON

    class Config:
        orm_mode = True

class PaymentMethodBase(BaseModel):
    p_method_name: str

class SaleBase(BaseModel):
    sale_date: date  # Cambiado a date para reflejar el tipo de dato adecuado
    sale_total: float
    sale_status: str
    customer: int
    payment_method: int
    city: int


# MySQL
class CampaignBase(BaseModel):
    campaign_id: int
    campaign_name: str
    start_date: date
    end_date: date
    total_budget: float
    promoted_product: int

    class Config:
        orm_mode = True

class MarketingSpendingBase(BaseModel):
    m_spending_date: str
    m_spending_amount: float
    m_spending_description: str
    campaign: int

# Oracle
class CategoryBase(BaseModel):
    category_name: str
    category_description: str

class ProductBase(BaseModel):
    product_name: str
    product_description: str
    product_price: float
    product_cost: float
    product_rating_stars: int
    category: int
# Mongo
class UserBase(BaseModel):
    user_email: str
    user_password: str
    user_name: str
    user_rol: str