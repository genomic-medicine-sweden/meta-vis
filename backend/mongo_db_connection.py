
from pymongo import MongoClient
from dotenv import dotenv_values
from typing import Any

def create_mongo_db_connection(env_path : str) -> MongoClient[Any]:
    mongo_client_creds = dotenv_values(env_path)
    return MongoClient(
        mongo_client_creds["url"],
        username = mongo_client_creds["username"],
        password = mongo_client_creds["password"]
    )
