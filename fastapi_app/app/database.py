from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import pymongo
from pymongo import MongoClient

# SQL Server
SQLALCHEMY_DATABASE_URL_SQLSERVER = "mssql+pymssql://sa:root@localhost:1433/customer_data"
engine_sqlserver = create_engine(SQLALCHEMY_DATABASE_URL_SQLSERVER)
SessionLocal_sqlserver = sessionmaker(autocommit=False, autoflush=False, bind=engine_sqlserver)

# PostgreSQL
SQLALCHEMY_DATABASE_URL_POSTGRES = "postgresql://postgres:postgres@localhost:5438/sales_data"
engine_postgres = create_engine(SQLALCHEMY_DATABASE_URL_POSTGRES)
SessionLocal_postgres = sessionmaker(autocommit=False, autoflush=False, bind=engine_postgres)

# MySQL
SQLALCHEMY_DATABASE_URL_MYSQL = "mysql+mysqlconnector://root:rootroot@localhost:3306/marketing_data"
engine_mysql = create_engine(SQLALCHEMY_DATABASE_URL_MYSQL)
SessionLocal_mysql = sessionmaker(autocommit=False, autoflush=False, bind=engine_mysql)

# Oracle
SQLALCHEMY_DATABASE_URL_ORACLE = "oracle+cx_oracle://projectmanager:rootroot@localhost:1523/free"
engine_oracle = create_engine(SQLALCHEMY_DATABASE_URL_ORACLE)
SessionLocal_oracle = sessionmaker(autocommit=False, autoflush=False, bind=engine_oracle)

# MongoDB
client_mongodb = MongoClient("mongodb://localhost:27018/")
db_mongodb = client_mongodb["user_data"]
users_collection = db_mongodb["users"]
Base = declarative_base()