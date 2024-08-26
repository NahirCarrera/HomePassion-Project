from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import customers, sales, campaigns, products, users, categories, customer_feedback, payment_methods

app = FastAPI()




# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permitir origenes específicos
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Incluir los routers para las diferentes bases de datos
app.include_router(customers.router, prefix="/customers", tags=["Customers"])
app.include_router(customer_feedback.router, prefix="/feedback", tags=["Customer_Feedback"])
app.include_router(sales.router, prefix="/sales", tags=["Sales"])
app.include_router(payment_methods.router, prefix="/methods", tags=["Payment_Methods"])
app.include_router(campaigns.router, prefix="/campaigns", tags=["Campaigns"])
app.include_router(categories.router, prefix="/categories", tags=["Categories"])
app.include_router(products.router, prefix="/products", tags=["Products"])
app.include_router(users.router, prefix="/users", tags=["Users"])
