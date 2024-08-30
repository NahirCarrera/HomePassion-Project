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
SQLALCHEMY_DATABASE_URL_POSTGRES = "postgresql://postgres:root@localhost:5432/sales_data"
engine_postgres = create_engine(SQLALCHEMY_DATABASE_URL_POSTGRES)
SessionLocal_postgres = sessionmaker(autocommit=False, autoflush=False, bind=engine_postgres)

# MySQL
SQLALCHEMY_DATABASE_URL_MYSQL = "mysql+mysqlconnector://admin:admin@localhost:3306/marketing_data"
engine_mysql = create_engine(SQLALCHEMY_DATABASE_URL_MYSQL)
SessionLocal_mysql = sessionmaker(autocommit=False, autoflush=False, bind=engine_mysql)

# Oracle
SQLALCHEMY_DATABASE_URL_ORACLE = "oracle+cx_oracle://base_alterna:rootroot@localhost:1521/XE"
engine_oracle = create_engine(SQLALCHEMY_DATABASE_URL_ORACLE)
SessionLocal_oracle = sessionmaker(autocommit=False, autoflush=False, bind=engine_oracle)

# MongoDB
client_mongodb = MongoClient("mongodb://localhost:27017/")
db_mongodb = client_mongodb["dbname"]

Base = declarative_base()
