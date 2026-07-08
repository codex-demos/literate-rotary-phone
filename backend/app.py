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
  return {"status": "good"}

@app.get("/api/resources")
def get_data():
  response = supabase.table(TABLE).select('*').execute()
  return {"resources": response.data}


@app.post("/api/resources")
def create_resource():
  data = request.get_json()

  if not data.get("title"):
    return {"error": "Title is required"}, 400

  response = supabase.table(TABLE).insert(data).execute()
  return response.data[0], 201

if __name__ == "__main__":
  app.run(debug=True)

