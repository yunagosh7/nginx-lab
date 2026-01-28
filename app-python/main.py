from typing import Union

from fastapi import FastAPI

import random

app = FastAPI()
users = [
    {"id": 1, "name": "Juan"},
    {"id": 2, "name": "Ana"},
    {"id": 3, "name": "Pedro"},
    {"id": 4, "name": "Lucía"},
]

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/users")
def read_item():
    return users