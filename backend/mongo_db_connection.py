
from pymongo import MongoClient
from pymongo.cursor import Cursor
from dotenv import dotenv_values
from typing import Any
from pathlib import Path

class DataBaseHandler():
    def __init__(self, db_name : str, collection_name : str, db_credentials_path : str) -> None:
        """
        Class for handling the connection to the MongoDB

        :param db_name: The name of the database
        :type db_name: str
        :param collection_name: The name of the collection in the database
        :type collection_name: str
        :param db_credentials_path: A file path to your credentials .env file
        :type db_credentials_path: str
        """
        if Path(db_credentials_path).is_file():
            self.client = self.__create_mongo_db_connection(db_credentials_path)    
            self.db = self.client.get_database(db_name)
            self.col = self.db.get_collection(collection_name)
        else:
            raise RuntimeError(db_credentials_path + " does not exist")

    def __create_mongo_db_connection(self, env_path : str) -> MongoClient[Any]:
        """
        Create a MongoDB Client object from a .env file. This method is only 
        intended for class internal use

        :param env_path: Path to .env file
        :type env_path: str
        :return: A MongoDB Client
        :rtype: MongoClient[Any]
        """
        mongo_client_creds = dotenv_values(env_path)
        return MongoClient(
            mongo_client_creds["url"],
            username = mongo_client_creds["username"],
            password = mongo_client_creds["password"]
        )
    
    def insert_entry(self, entry : dict) -> None:
        """
        Insert an entry into the MongoDB

        :param entry: The entry as a dictionary
        :type entry: dict
        """
        self.col.insert_one(entry)

    def retrieve_entries_by_filter(self, filters : dict) -> Cursor[Any]:
        """
        Retrieve all entries, given a filter dictionary, as a Cursor object

        :param filters: A dictionary for finding entries that match the 
        key-values in it, to the entries in the database
        :type filters: dict
        :return: A Cursor object containing the matching entries
        :rtype: Cursor[Any]
        """
        return self.col.find(filters)
    
    def retrieve_entry_by_id(self, id : str) -> Cursor[Any]:
        """
        Retrieve the entry, given an ID, as a Cursor object

        :param id: The ID for an entry
        :type id: str
        :return: A Cursor object containing the matching entry
        :rtype: Cursor[Any]
        """
        return self.col.find({"_id" : id})
    
    def retrieve_entries(self, page_number : int, nb_of_entries_per_page : int) -> Cursor[Any]:
        """
        Retrieve entries on page `page_number` with `nb_of_entries_per_page` of entries per page.

        :param page_number: The current page number
        :type page_number: int
        :param nb_of_entries_per_page: Number of entries per page
        :type nb_of_entries_per_page: int
        :return: A Cursor object containing the `nb_of_entries * nb_of_entries_per_page` entries
        :rtype: Cursor[Any]
        """
        if page_number < 1 or nb_of_entries_per_page < 1:
            raise Exception("page_number or nb_of_entries_per_page cannot be < 1")
        skip_count = (page_number - 1) * nb_of_entries_per_page
        return self.col.find().skip(skip_count).limit(nb_of_entries_per_page)