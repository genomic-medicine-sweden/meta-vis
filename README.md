# meta-vis
Visualisation of metagenomic analysis results. 

## Tutorial 
[Last updated: 2024-06-26]

In order to use the API you need the following:
* A MongoDB
* A folder called `.secrets` in the root of this repo. This folder and its contents will be gitignored.
  * `.secrets` must contain a file called `credentials.env`:
    ```
    url = your_url
    username = your_username
    password = your_password
    ```
    These credentials are for your MongoDB which also needs to be set up.

[Create and activate a virtual environment](https://docs.python.org/3/library/venv.html) and then run `pip install -r requirements.txt`. 

The backend uses the FastAPI Python library, with which can be start development server:
```
fastapi dev backend/api.py
```
Note: You need to be in the root of the repo for this to work.

A development server will start at [`http://127.0.0.1:8000`](http://127.0.0.1:8000), and it's corresponding Swagger UI can be accessed at [`http://127.0.0.1:8000/docs`](http://127.0.0.1:8000/docs)