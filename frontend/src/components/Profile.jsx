import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig'; // Adjust the path if necessary
import axios from 'axios';
import FlightSearch from './FlightSearch';

const Profile = ({ onSearch }) => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      fetchBookingHistory(userId);
    }
  }, [userId]);

  const fetchBookingHistory = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/bookings/${userId}`);
      setBookingHistory(response.data || []);
    } catch (error) {
      console.error('Could not load booking history:', error);
    }
  };

  const handleBookingSuccess = (newBooking) => {
    setBookingHistory((prevHistory) => [...prevHistory, newBooking]);
  };

  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Profile Overview</h1>
      {auth.currentUser && <p className="text-lg text-gray-700">Hello, {auth.currentUser.email}</p>}

      <div className="flex flex-col lg:flex-row gap-10 mt-10">
        
        {/* Booking History Section */}
        <section className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
          {bookingHistory.length > 0 ? (
            <div className="max-h-96 overflow-y-auto space-y-4">
              {bookingHistory.map((booking, idx) => (
                <div key={idx} className="border p-4 rounded-lg">
                  <p><strong>Flight:</strong> {booking.flight_details.flightNumber}</p>
                  <p><strong>Date:</strong> {booking.flight_details.date}</p>
                  <p><strong>From:</strong> {booking.flight_details.origin} <strong>To:</strong> {booking.flight_details.destination}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No bookings found.</p>
          )}
        </section>

        {/* Flight Search Section */}
        <section className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Find Flights</h2>
          <FlightSearch onSearch={onSearch} onBookingSuccess={handleBookingSuccess} />
        </section>
      </div>
    </div>
  );
};

export default Profile;
