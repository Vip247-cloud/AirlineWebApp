from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")
DB_TABLE_NAME = os.getenv("DB_TABLE_NAME")
AWS_SESSION_TOKEN = os.getenv('AWS_SESSION_TOKEN')

# Debugging: print loaded environment variables
print("AWS_ACCESS_KEY_ID:", AWS_ACCESS_KEY_ID)
print("AWS_SECRET_ACCESS_KEY:", AWS_SECRET_ACCESS_KEY)
print("AWS_REGION:", AWS_REGION)
print("DB_TABLE_NAME:", DB_TABLE_NAME)

print("AWS_SESSION_TOKEN :", AWS_SESSION_TOKEN)
