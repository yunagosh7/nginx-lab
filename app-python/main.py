import uuid
import random
from fastapi import FastAPI
from pydantic import BaseModel

from messaging.publisher import publish_tier_update

app = FastAPI()

payments: list[dict] = []


class PaymentRequest(BaseModel):
    userId: str
    amount: float
    type: str  # "subscription" | "one_time"


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/payments")
def list_payments():
    return payments


@app.post("/payments")
async def process_payment(payment: PaymentRequest):
    # Mock: 90% success rate
    success = random.random() < 0.9

    record = {
        "id": str(uuid.uuid4()),
        "userId": payment.userId,
        "amount": payment.amount,
        "type": payment.type,
        "status": "success" if success else "failed",
    }
    payments.append(record)

    if success and payment.type == "subscription":
        await publish_tier_update(payment.userId, "premium")

    return record
