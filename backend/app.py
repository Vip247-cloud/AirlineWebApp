

from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from models.booking import Booking

import boto3
from botocore.exceptions import ClientError
# from config import config
import os

from booking_pdf_generator.booking_pdf_generator.pdf_generator import generate_booking_pdf

from flask import Flask, request, send_file, jsonify
# from pdf_service import generate_booking_pdf 


import boto3
from reportlab.pdfgen import canvas
from io import BytesIO



def create_pdf(booking_details):
    """
    Generate a booking confirmation PDF using ReportLab.
    """
    pdf_buffer = BytesIO()
    pdf = canvas.Canvas(pdf_buffer)
    
    # Add content to the PDF
    pdf.setFont("Helvetica", 12)
    pdf.drawString(100, 800, "Booking Confirmation")
    pdf.drawString(100, 780, f"Booking ID: {booking_details['bookingId']}")
    pdf.drawString(100, 760, f"Flight Number: {booking_details['flightNumber']}")
    pdf.drawString(100, 740, f"Departure: {booking_details['departureTime']}")
    pdf.drawString(100, 720, f"From: {booking_details['origin']}")
    pdf.drawString(100, 700, f"To: {booking_details['destination']}")
    pdf.save()
    
    # Reset buffer position
    pdf_buffer.seek(0)
    return pdf_buffer

def upload_to_s3(pdf_buffer, bucket_name, key):
    """
    Upload a file-like object (PDF) to an S3 bucket.
    """
    s3_client = boto3.client('s3', region_name='us-east-1')
    try:
        s3_client.upload_fileobj(pdf_buffer, bucket_name, key)
        print(f"File uploaded successfully to {bucket_name}/{key}")
    except Exception as e:
        print(f"Error uploading file: {e}")
        raise



def handle_booking_confirmation(booking_details):
    """
    Handle booking confirmation: generate PDF and upload to S3.
    """
    # Create the PDF
    pdf_buffer = create_pdf(booking_details)
    
    # Define S3 bucket and key
    bucket_name = 'airlinebookingdocument'
    key = f"bookings/{booking_details['bookingId']}.pdf"
    
    # Upload PDF to S3
    upload_to_s3(pdf_buffer, bucket_name, key)




app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# # Initialize SES client
# ses_client = boto3.client('ses', region_name='ap-south-1')  # Use your SES region here

# def send_email_ses(recipient_email, subject, body):
#     try:
#         # Send email using SES
#         response = ses_client.send_email(
#             Source='deepcloud.28@gmail.com',  # Replace with your verified SES email address
#             Destination={
#                 'ToAddresses': [
#                     recipient_email  # The recipient email address
#                 ]
#             },
#             Message={
#                 'Subject': {
#                     'Data': subject
#                 },
#                 'Body': {
#                     'Text': {
#                         'Data': body
#                     }
#                 }
#             }
#         )
#         print("Email sent! Message ID:", response['MessageId'])
#     except ClientError as e:
#         print("Error sending email:", e)



# # Initialize SNS client
sns_client = boto3.client('sns', region_name='us-east-1')  # Replace with your SNS region


# SNS topic ARN (replace with your actual SNS topic ARN)
SNS_TOPIC_ARN = "arn:aws:sns:us-east-1:020261227574:AirlineBookingeNotifications"


def send_email_sns(email, subject, body):
    try:
        # Publish message to SNS topic
        response = sns_client.publish(
            TopicArn=SNS_TOPIC_ARN,
            Message=body,
            Subject=subject
        )
        print("Email sent! Message ID:", response['MessageId'])
    except Exception as e:
        print("Error sending email:", e)


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
        send_email_sns(user_email, subject, body)
        print("emailfunction run")

    return jsonify(booking_data), 201

# Route to get all bookings for a user
@app.route('/bookings/<user_id>', methods=['GET'])
def get_bookings(user_id):  # Take user_id directly from URL path
    print(user_id)
    print(Booking)
    bookings = Booking.get_user_bookings(user_id)
    return jsonify(bookings), 200



###### generate booking pdf in that case########
@app.route('/bookings/pdf', methods=['POST'])
def create_booking_pdf():
    try:
        # Extract booking details from the request body
        print(request.get_json())
        booking_details = request.get_json()
        handle_booking_confirmation(booking_details)
        # Generate the PDF
        file_path = generate_booking_pdf(booking_details)

        # Serve the generated PDF
        return send_file(file_path, as_attachment=True)

    except Exception as e:
        print("Error generating PDF:", e)
        return jsonify({"message": "Failed to generate PDF"}), 500
    



###### generate booking pdf in that case########



# Route to get all bookings for a user
@app.route('/hello', methods=['GET'])
def Hello():  # Take user_id directly from URL path
        return 'Hello World03'

if __name__ == '__main__':
    app.run(port=5000)



