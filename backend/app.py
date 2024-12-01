

from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from models.booking import Booking

import boto3
from botocore.exceptions import ClientError
# from config import config

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# Initialize SES client
ses_client = boto3.client('ses', region_name='ap-south-1')  # Use your SES region here

def send_email_ses(recipient_email, subject, body):
    try:
        # Send email using SES
        response = ses_client.send_email(
            Source='deepcloud.28@gmail.com',  # Replace with your verified SES email address
            Destination={
                'ToAddresses': [
                    recipient_email  # The recipient email address
                ]
            },
            Message={
                'Subject': {
                    'Data': subject
                },
                'Body': {
                    'Text': {
                        'Data': body
                    }
                }
            }
        )
        print("Email sent! Message ID:", response['MessageId'])
    except ClientError as e:
        print("Error sending email:", e)


# # Initialize SNS client
# sns_client = boto3.client('sns', region_name='ap-south-1')  # Replace with your SNS region

# # SNS topic ARN (replace with your actual SNS topic ARN)
# SNS_TOPIC_ARN = "arn:aws:sns:ap-south-1:484907490372:airline"

# def send_email_sns(email, subject, body):
#     try:
#         # Publish message to SNS topic
#         response = sns_client.publish(
#             TopicArn=SNS_TOPIC_ARN,
#             Message=body,
#             Subject=subject
#         )
#         print("Email sent! Message ID:", response['MessageId'])
#     except Exception as e:
#         print("Error sending email:", e)


# Route to create a new booking
@app.route('/bookings', methods=['POST'])

def create_booking():
    data = request.get_json()
    print(data)
    user_id = data.get('userId')  # Changed to match frontend data format
    flight_details = data.get('flightDetails')
    passenger_info = data.get('passengerInfo')

    if not user_id or not flight_details or not passenger_info:
        return jsonify({"error": "Missing required data"}), 400

    booking_data = Booking.create_booking(user_id, flight_details, passenger_info)

    # Send email using SNS
    user_email = data.get('passengerInfo').get('email') 
    if user_email:
        subject = "Booking Confirmation"
        body = f"Dear {data.get('passengerInfo').get('name') },\n\nYour booking has been confirmed for flight {data.get('flightDetails').get('flightNumber')}.\n\nThank you for choosing our service!"
        # send_email_sns(user_email, subject, body)
        send_email_ses(user_email, subject, body)
        print("emailfunction run")

    return jsonify(booking_data), 201

# Route to get all bookings for a user
@app.route('/bookings/<user_id>', methods=['GET'])
def get_bookings(user_id):  # Take user_id directly from URL path
    print(user_id)
    print(Booking)
    bookings = Booking.get_user_bookings(user_id)
    return jsonify(bookings), 200



# Route to get all bookings for a user
@app.route('/hello', methods=['GET'])
def Hello():  # Take user_id directly from URL path
        return 'Hello World'

if __name__ == '__main__':
    app.run(port=5000)
