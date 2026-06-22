from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")

# Create database
db = client["employee_db"]

# Create collection
collection = db["employees"]

print("Connected to MongoDB successfully!")