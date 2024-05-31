
from fastapi import FastAPI
from pydantic import BaseModel
from mongo_db_connection import DataBaseHandler
from fastapi.testclient import TestClient

class RetrieveEntriesByFilter(BaseModel):
    filters : dict

class RetrieveEntryById(BaseModel):
    id : str

class InsertEntries(BaseModel):
    entry : dict

app = FastAPI()
client = TestClient(app)

db_h = DataBaseHandler("init-test-db", "data", ".secrets/credentials.env")

@app.post("/retrieve_entries_by_filter/")
def retrieve_entries_by_filter(data_base_request : RetrieveEntriesByFilter) -> list[dict]:
    entries = db_h.retrieve_entries_by_filter(data_base_request.filters)
    return list(entries)

@app.post("/retrieve_entry_by_id/")
def retrieve_entry_by_id(data_base_request : RetrieveEntryById) -> list[dict]:
    entry = db_h.retrieve_entry_by_id(data_base_request.id)
    return list(entry)

@app.post("/insert_entry/")
def insert_entry(data_base_request : InsertEntries) -> None:
    db_h.insert_entry(data_base_request.entry)
    