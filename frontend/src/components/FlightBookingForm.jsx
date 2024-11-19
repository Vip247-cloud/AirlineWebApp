
import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebaseConfig';  // Import Firebase auth

const FlightBookingForm = ({ flight, onBookingSuccess, onClose }) => {
  const [passengerName, setPassengerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = async () => {
    try {
      setIsLoading(true);

      // Get the current user's ID from Firebase
      const userId = auth.currentUser?.uid;
      if (!userId) {
        alert('Please login to book a flight');
        return;
      }

      // Prepare booking data
      const bookingData = {
        userId,  // Include userId
        flightDetails: {
          flightNumber: flight.flight.number,
          origin: flight.arrival.airport,
          destination: flight.departure.airport,
          date: flight.flight_date,
        },
        passengerInfo: {
          name: passengerName,
          contact: contactNumber,
          email,
        },
      };

      // Send POST request to the backend with booking data
      const response = await axios.post('http://localhost:5000/bookings', bookingData);  // Updated URL to match backend

      // console.log(response.data)

      // On success, pass the booking ID and flight details back to parent component
      if (response.status === 201) {
        onBookingSuccess(response.data.booking_id, {
          flightNumber: flight.flight.number,
          departureTime: flight.departure.scheduled,
          origin: flight.arrival.airport,
          destination: flight.departure.airport,
        });
        onClose();  // Close the booking form after successful booking
      } else {
        alert('Booking failed, please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to complete booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <h2 className="text-xl font-bold mb-4">Book Flight</h2>
        
        {/* Passenger Name Input */}
        {/* booking details */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Passenger Name</label>
          <input
            type="text"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded" 
            required
          />
        </div>

        {/* Contact Number Input */}
        {/* booking details */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Contact Number</label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        {/* Email Input */}
        {/* booking details */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        {/* Cancel and Confirm Booking Buttons */}
        {/* booking details */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2" 
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingForm;
