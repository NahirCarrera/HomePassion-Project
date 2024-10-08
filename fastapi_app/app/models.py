from sqlalchemy import Column, Integer, String, Text, DECIMAL, TIMESTAMP, ForeignKey, Identity, Float, Date
from sqlalchemy.ext.declarative import declarative_base
from geoalchemy2 import Geography, WKTElement
from geoalchemy2.shape import to_shape
from shapely.geometry import mapping, shape

Base = declarative_base()

# SQL Server
class Customer(Base):
    __tablename__ = "CUSTOMERS"
    customer_id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(255))
    customer_email = Column(String(255))
    customer_phone = Column(String(255))
    customer_address = Column(String(255))

class CustomerFeedback(Base):
    __tablename__ = "CUSTOMER_FEEDBACK"
    feedback_id = Column(Integer, primary_key=True, index=True)
    feedback_text = Column(String(255))
    feedback_date = Column(String(255))
    customer_id = Column(Integer, ForeignKey("CUSTOMERS.customer_id"))
    feedback_order = Column(Integer)

# PostgreSQL
class Province(Base):
    __tablename__ = "provinces"
    province_id = Column(Integer, primary_key=True, index=True)
    province_name = Column(String(255))

class City(Base):
    __tablename__ = 'cities'

    city_id = Column(Integer, primary_key=True, autoincrement=True)
    city_name = Column(String(255), nullable=False)
    province = Column(Integer, ForeignKey('provinces.province_id'))
    location = Column(Geography(geometry_type='POINT', srid=4326))

    @property
    def location_as_geojson(self):
        if self.location:
            shape_obj = to_shape(self.location)
            return mapping(shape_obj)
        return None

class PaymentMethod(Base):
    __tablename__ = "payment_methods"
    payment_method_id = Column(Integer, primary_key=True, index=True)
    p_method_name = Column(String(255))

class Sale(Base):
    __tablename__ = "sales"
    __table_args__ = {'schema': 'public'}
    sale_id = Column(Integer, primary_key=True)
    sale_date = Column(Date)
    sale_total = Column(DECIMAL(10, 2))
    sale_status = Column(String(255))
    customer = Column(Integer)
    payment_method = Column(Integer, ForeignKey("PAYMENT_METHODS.payment_method_id"))
    city = Column(Integer, ForeignKey("CITIES.city_id"))

# MySQL
class Campaign(Base):
    __tablename__ = "campaigns"
    campaign_id = Column(Integer, primary_key=True)
    campaign_name = Column(Text)
    start_date = Column(TIMESTAMP)
    end_date = Column(TIMESTAMP)
    total_budget = Column(DECIMAL(10, 2))
    promoted_product = Column(Integer)

class MarketingSpending(Base):
    __tablename__ = "MARKETING_SPENDING"
    marketing_spending = Column(Integer, primary_key=True, index=True)
    m_spending_date = Column(TIMESTAMP)
    m_spending_amount = Column(DECIMAL(10, 2))
    m_spending_description = Column(Text)
    campaign = Column(Integer)

# Oracle
class Category(Base):
    __tablename__ = "CATEGORIES"
    category_id = Column(Integer, Identity(start=1), primary_key=True, index=True)
    category_name = Column(String(255))
    category_description = Column(String(255))

class Product(Base):
    __tablename__ = "PRODUCTS"
    product_id = Column(Integer, Identity(start=1), primary_key=True, index=True)
    product_name = Column(String(255))
    product_description = Column(String(255))
    product_price = Column(Float)
    product_cost = Column(Float)
    product_rating_stars = Column(Integer)
    category = Column(Integer, ForeignKey("CATEGORIES.category_id"))
