from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS
from supabase import create_client, Client
import os

load_dotenv()
app = Flask(__name__)
CORS(app, origins=["*"])

TABLE = "friendly_giggle_resources"
supabase: Client = create_client(
  os.getenv("SUPABASE_URL"),
  os.getenv("SUPABASE_KEY")
)


@app.get("/")
def health():
  return {"status": "ok"}

@app.get("/api/resources")
def get_data():
  response = supabase.table(TABLE).select('*').execute()
  return {"resources": response.data}


@app.post("/api/resources")
def create_resource():
  data = request.get_json()

  if not data.get("title"):
    return {"error": "title is required"}, 400

  response = supabase.table(TABLE).insert(data).execute()
  return response.data[0], 201


@app.post("/api/login")
def login():
  auth_data = request.get_json()
  # whatAreTheyDoing = data.get("whatTheyAreDoing")
  # doing a login --- "loggingIn"
  #  conditional to see which function/method to call
  auth_response = supabase.auth.sign_in_with_password(
    {
      "email": auth_data.get("email"),
      "password": auth_data.get("password")
    }
  )
  return {
    "token":auth_response.session.access_token,
    "user": {
      "email": auth_response.user.email,
      "created_at": auth_response.user.created_at
    }
  } ,200


if __name__ == "__main__":
  app.run(debug=True)

