import boto3
import uuid
from datetime import datetime
from config import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, DB_TABLE_NAME

# Initialize DynamoDB client using the configuration from config.py
dynamodb = boto3.resource(
    'dynamodb',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

# DynamoDB table reference
print("Using AWS Access Key ID:", AWS_ACCESS_KEY_ID)  # For debugging, remove in production

table = dynamodb.Table(DB_TABLE_NAME)

class Booking:
    @staticmethod
    def create_booking(user_id, flight_details, passenger_info):
        booking_id = str(uuid.uuid4())  # Generate a unique booking ID
        booking_data = {
            'booking_id': booking_id,
            'user_id': user_id,
            'flight_details': flight_details,
            'passenger_info': passenger_info,
            'status': 'CONFIRMED',
            'created_at': datetime.utcnow().isoformat()
        }
        # Insert data into DynamoDB
        table.put_item(Item=booking_data)
        return booking_data

    @staticmethod
    def get_user_bookings(user_id):
        response = table.query(
            IndexName='user_id-index',  # Ensure an index on user_id for efficient querying
            KeyConditionExpression=boto3.dynamodb.conditions.Key('user_id').eq(user_id)
        )
        return response.get('Items', [])
