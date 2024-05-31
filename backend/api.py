
from fastapi import FastAPI
from pydantic import BaseModel
from mongo_db_connection import DataBaseHandler
from fastapi.testclient import TestClient

class DataBaseRequest(BaseModel):
    filters : dict

app = FastAPI()
client = TestClient(app)

db_h = DataBaseHandler("init-test-db", "data", ".secrets/credentials.env")

@app.post("/retrieve_entries_by_filter/")
def retrieve_entries_by_filter(data_base_request : DataBaseRequest):
    entries = db_h.retrieve_entries_by_filter(data_base_request.filters)
    return list(entries)
