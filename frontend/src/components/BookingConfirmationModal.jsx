
import React from 'react'; // import react 





const BookingConfirmationModal = ({ bookingDetails, onClose }) => {
  if (!bookingDetails) return null;

  const downloadPDF = async () => {
    const response = await fetch('http://airline-backend-dev.us-east-1.elasticbeanstalk.com/bookings/pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingDetails),
    });
  
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Booking_${bookingDetails.bookingId}.pdf`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h2 className="text-xl font-bold mb-4">Booking Confirmed!</h2> {/* booking details */}
        <p>Booking ID: {bookingDetails.bookingId}</p> {/* booking details */}
        <p>Flight Number: {bookingDetails.flightNumber}</p> {/* booking details */}
        <p>Departure Time: {bookingDetails.departureTime}</p> {/* booking details */}
        <p>From: {bookingDetails.origin} - To: {bookingDetails.destination}</p> {/* booking details */}
        <button onClick={downloadPDF} className="bg-green-500 text-white px-4 py-2 rounded">
             Download PDF
        </button>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
