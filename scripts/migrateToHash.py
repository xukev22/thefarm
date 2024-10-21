import bcrypt
import psycopg2
import os
from dotenv import load_dotenv

# Connect to your PostgreSQL database
# Replace with your actual connection details

# Specify the file path to your .env.local file
load_dotenv(dotenv_path='.env.local')

conn = psycopg2.connect(
    dbname=os.environ.get("DB_NAME"),
    user=os.environ.get("DB_USER"),
    password=os.environ.get("DB_PASSWORD"),
    host=os.environ.get("DB_HOST"),
    port=5432
)

# Create a cursor to execute SQL queries
cur = conn.cursor()


# Function to hash a password
def hash_password(plain_password: str) -> str:
    # Generate a bcrypt hash
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(plain_password.encode("utf-8"), salt)
    return hashed_password.decode("utf-8")


# Query to get all users with their plain text passwords
cur.execute("SELECT id, password FROM profile")
users = cur.fetchall()

# Loop through each user and update their password with the hashed version
for user in users:
    user_id, plain_password = user

    # Hash the plain text password
    hashed_password = hash_password(plain_password)

    # Update the password in the database
    cur.execute(
        "UPDATE profile SET password = %s WHERE id = %s", (hashed_password, user_id)
    )
    
    print(user)

# Commit changes and close the connection
conn.commit()
cur.close()
conn.close()

print("All passwords have been hashed and updated successfully.")
