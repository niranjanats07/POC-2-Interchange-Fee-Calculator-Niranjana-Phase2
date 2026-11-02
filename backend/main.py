
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Real Rails Interchange Fee API",
    version="1.0.0",
)

# Allow the Next.js frontend to communicate with this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FeeRequest(BaseModel):
    transaction_amount: float
    card_type: str = "Credit Card"
    mcc: str = "Retail"
    channel: str = "Online"
    geography: str = "India"
    interchange_rate: float = 1.8
    processor_fee: float = 0.3


@app.get("/")
def root():
    return {
        "status": "ok",
        "project": "Real Rails Batch 8",
        "poc": "#2 - Interchange Fee Calculator",
        "data_mode": "Synthetic",
    }


@app.post("/api/calculate")
def calculate_fee(request: FeeRequest):
    interchange_rate = request.interchange_rate

    if request.channel.lower() == "online":
        interchange_rate += 0.2

    network_fee_rate = 0.1

    interchange_fee = (
        request.transaction_amount * interchange_rate / 100
    )
    processor_cost = (
        request.transaction_amount * request.processor_fee / 100
    )
    network_cost = (
        request.transaction_amount * network_fee_rate / 100
    )

    total_fee = interchange_fee + processor_cost + network_cost
    net_amount = request.transaction_amount - total_fee

    effective_fee_rate = (
        total_fee / request.transaction_amount * 100
        if request.transaction_amount > 0
        else 0
    )

    return {
        "data_mode": "Synthetic",
        "transaction_amount": request.transaction_amount,
        "interchange_rate": interchange_rate,
        "processor_fee": request.processor_fee,
        "network_fee_rate": network_fee_rate,
        "interchange_fee": round(interchange_fee, 2),
        "processor_cost": round(processor_cost, 2),
        "network_cost": round(network_cost, 2),
        "total_fee": round(total_fee, 2),
        "net_amount": round(net_amount, 2),
        "effective_fee_rate": round(effective_fee_rate, 2),
    }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Real Rails Interchange Fee API",
    version="1.0.0",
)

# Allow the Next.js frontend to communicate with this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FeeRequest(BaseModel):
    transaction_amount: float
    card_type: str = "Credit Card"
    mcc: str = "Retail"
    channel: str = "Online"
    geography: str = "India"
    interchange_rate: float = 1.8
    processor_fee: float = 0.3


@app.get("/")
def root():
    return {
        "status": "ok",
        "project": "Real Rails Batch 8",
        "poc": "#2 - Interchange Fee Calculator",
        "data_mode": "Synthetic",
    }


@app.post("/api/calculate")
def calculate_fee(request: FeeRequest):
    interchange_rate = request.interchange_rate

    if request.channel.lower() == "online":
        interchange_rate += 0.2

    network_fee_rate = 0.1

    interchange_fee = (
        request.transaction_amount * interchange_rate / 100
    )
    processor_cost = (
        request.transaction_amount * request.processor_fee / 100
    )
    network_cost = (
        request.transaction_amount * network_fee_rate / 100
    )

    total_fee = interchange_fee + processor_cost + network_cost
    net_amount = request.transaction_amount - total_fee

    effective_fee_rate = (
        total_fee / request.transaction_amount * 100
        if request.transaction_amount > 0
        else 0
    )

    return {
        "data_mode": "Synthetic",
        "transaction_amount": request.transaction_amount,
        "interchange_rate": interchange_rate,
        "processor_fee": request.processor_fee,
        "network_fee_rate": network_fee_rate,
        "interchange_fee": round(interchange_fee, 2),
        "processor_cost": round(processor_cost, 2),
        "network_cost": round(network_cost, 2),
        "total_fee": round(total_fee, 2),
        "net_amount": round(net_amount, 2),
        "effective_fee_rate": round(effective_fee_rate, 2),
    }
