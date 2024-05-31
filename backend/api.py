
from fastapi import FastAPI
from pydantic import BaseModel
from mongo_db_connection import DataBaseHandler
from fastapi.testclient import TestClient

class RetrieveEntries(BaseModel):
    filters : dict

class InsertEntries(BaseModel):
    entry : dict

app = FastAPI()
client = TestClient(app)

db_h = DataBaseHandler("init-test-db", "data", ".secrets/credentials.env")

@app.post("/retrieve_entries_by_filter/")
def retrieve_entries_by_filter(data_base_request : RetrieveEntries):
    entries = db_h.retrieve_entries_by_filter(data_base_request.filters)
    return list(entries)

@app.post("/insert_entry/")
def insert_entry(data_base_request : InsertEntries):
    db_h.insert_entry(data_base_request.entry)
    