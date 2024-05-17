
from pymongo import MongoClient
from pymongo.cursor import Cursor
from bson import ObjectId
from dotenv import dotenv_values
from typing import Any

class DataBaseHandler():
    def __init__(self, db_name : str, collection_name : str, db_credentials_path : str) -> None:
        self.client = self.create_mongo_db_connection(db_credentials_path)    
        self.db = self.client.get_database(db_name)
        self.col = self.db.get_collection(collection_name)

    def create_mongo_db_connection(self, env_path : str) -> MongoClient[Any]:
        mongo_client_creds = dotenv_values(env_path)
        return MongoClient(
            mongo_client_creds["url"],
            username = mongo_client_creds["username"],
            password = mongo_client_creds["password"]
        )
    
    def insert_entry(self, entry : dict) -> None:
        self.col.insert_one(entry)

    def retrieve_entries_by_filter(self, filters : dict) -> Cursor[Any]:
        return self.col.find(filters)
    
    def retrieve_entries_by_id(self, id : str) -> Cursor[Any]:
        return self.col.find({"_id" : ObjectId(id)})