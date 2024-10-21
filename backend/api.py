
from fastapi import FastAPI
from pydantic import BaseModel
from mongo_db_connection import DataBaseHandler
from fastapi.testclient import TestClient

class RetrieveEntriesByFilter(BaseModel):
    filters : dict

class InsertEntries(BaseModel):
    entry : dict

app = FastAPI()
client = TestClient(app)

db_h = DataBaseHandler("init-test-db", "data", ".secrets/credentials.env")

@app.post("/retrieve_entries_by_filter/")
def retrieve_entries_by_filter(data_base_request : RetrieveEntriesByFilter) -> list[dict]:
    """
    Retrieve database entries by a filter (specified as a dictionary) that 
    MongoDB accepts. For more information about how to structure the queries follow this link:
    https://pymongo.readthedocs.io/en/stable/tutorial.html#querying-for-more-than-one-document.
    """
    entries = db_h.retrieve_entries_by_filter(data_base_request.filters)
    return list(entries)

@app.get("/retrieve_entry_by_id/{id}")
def retrieve_entry_by_id(id : str) -> list[dict]:
    """
    Retrieve a database entry by its ID.
    """
    entry = db_h.retrieve_entry_by_id(id)
    return list(entry)

@app.get("/retrieve_entries/{nb_of_pages}/{nb_of_entries_per_page}")
def retrieve_entries(nb_of_pages : int, nb_of_entries_per_page : int) -> list[dict]:
    """
    Retrieve the first `nb_of_nb_of_pages * nb_of_entries_per_page` entries from the database
    """
    entries = db_h.retrieve_entries(nb_of_pages, nb_of_entries_per_page)
    return list(entries)

@app.post("/insert_entry/")
def insert_entry(data_base_request : InsertEntries) -> None:
    """
    Insert an entry to the database, which is in the shape of a JSON-object. 
    """
    db_h.insert_entry(data_base_request.entry)
    