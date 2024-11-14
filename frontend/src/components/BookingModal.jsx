
import React, { useState } from 'react';
import axios from 'axios';

const BookingModal = ({ flight, onClose, onConfirm }) => {
  const [bookingId, setBookingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      // Simulate the booking API call (could be an actual API call to your cloud backend)
      const response = await axios.post('http://localhost:5000/bookings', {
        flightNumber: flight.flight.number,
        origin: flight.arrival.airport,
        destination: flight.departure.airport,
        departureTime: flight.departure.scheduled,
        // price: flight.price,
      });

      // Assuming the backend returns a booking ID
      setBookingId(response.data.id);
      onConfirm(response.data.id); // Passing booking ID to parent
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!flight) return null; // If no flight is selected, don't show the modal

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
        <p>Flight Number: {flight.flight.number}</p> {/* booking details */}
        <p>From: {flight.arrival.airport}</p> {/* booking details */}
        <p>To: {flight.departure.airport}</p> {/* booking details */}
        <p>DepartureTime: {flight.departure.scheduled}</p> {/* booking details */}
        {/* <p>Price: ${flight.price}</p> */}

        {/* Show booking ID if booking is confirmed */}
        {bookingId && (
          <div className="mt-4">
            <p>Your booking ID is: {bookingId}</p> {/* booking details */}
            <p>Thank you for booking with us!</p> {/* booking details */}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
