import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for conditional redirection
import { auth } from '../firebaseConfig'; // Import Firebase auth
import FlightBookingForm from './FlightBookingForm';
import BookingConfirmationModal from './BookingConfirmationModal';

const FlightResults = ({ flights = [] }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null); // Store booking details
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [redirectToSignIn, setRedirectToSignIn] = useState(false); // Track if we need to redirect to sign in

  // Check if the user is signed in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // Set isAuthenticated to true if user is logged in
    });
    return unsubscribe; // Clean up subscription on unmount
  }, []);

  const handleBookingSuccess = (id, details) => {
    setBookingDetails({
      bookingId: id,
      flightNumber: details.flightNumber,
      departureTime: details.departureTime,
      origin: details.origin,
      destination: details.destination,
    });
    setSelectedFlight(null); // Close the booking form
  };

  const handleBooking = (flight) => {
    if (!isAuthenticated) {
      // Set flag to redirect to sign-in if user is not signed in
      setRedirectToSignIn(true);
    } else {
      // If authenticated, proceed to book the flight
      setSelectedFlight(flight);
      setBookingDetails(null); // Reset any previous booking details
    }
  };

  const handleCloseForm = () => {
    setSelectedFlight(null);
  };

  const handleCloseConfirmation = () => {
    setBookingDetails(null); // Close the confirmation modal
  };

  // Redirect to sign-in page if not authenticated
  if (redirectToSignIn) {
    return <Navigate to="/signin" state={{ message: 'Please sign in to book a flight.' }} />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Available Flights</h2>
      {flights.length > 0 ? (
        flights.map((flight, index) => (
          <div key={index} className="border-b border-gray-200 py-4">
            <p className="text-sm font-medium">Flight Number: {flight.flight.number}</p>
            <p className="text-sm">Airline: {flight.airline.name}</p>
            <p className="text-sm">From: {flight.departure.airport} - To: {flight.arrival.airport}</p>
            <p className="text-sm">Departure Time: {flight.departure.scheduled}</p>
            <p className="text-sm">Status: {flight.flight_status}</p>
            <button
              onClick={() => handleBooking(flight)}
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Book Now
            </button>
          </div>
        ))
      ) : (
        <p>No flights found for the selected route.</p>
      )}

      {selectedFlight && (
        <FlightBookingForm
          flight={selectedFlight}
          onBookingSuccess={handleBookingSuccess}
          onClose={handleCloseForm}
        />
      )}

      {bookingDetails && (
        <BookingConfirmationModal
          bookingDetails={bookingDetails}
          onClose={handleCloseConfirmation}
        />
      )}
    </div>
  );
};

export default FlightResults;




// // src/components/FlightResults.jsx
// import React, { useState } from 'react';
// import FlightBookingForm from './FlightBookingForm';
// import BookingConfirmationModal from './BookingConfirmationModal';

// const FlightResults = ({ flights = [] }) => {
//   const [selectedFlight, setSelectedFlight] = useState(null);
//   const [bookingDetails, setBookingDetails] = useState(null); // Store booking details

//   const handleBookingSuccess = (id, details) => {
//     setBookingDetails({
//       bookingId: id,
//       flightNumber: details.flightNumber,
//       departureTime: details.departureTime,
//       origin: details.origin,
//       destination: details.destination,
//     });
//     setSelectedFlight(null); // Close the booking form
//   };

//   const handleBooking = (flight) => {
//     setSelectedFlight(flight);
//     setBookingDetails(null); // Reset any previous booking details
//   };

//   const handleCloseForm = () => {
//     setSelectedFlight(null);
//   };

//   const handleCloseConfirmation = () => {
//     setBookingDetails(null); // Close the confirmation modal
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-10">
//       <h2 className="text-xl font-bold mb-4">Available Flights</h2>
//       {flights.length > 0 ? (
//         flights.map((flight, index) => (
//           <div key={index} className="border-b border-gray-200 py-4">
//             <p className="text-sm font-medium">Flight Number: {flight.flight.number}</p>
//             <p className="text-sm">Airline: {flight.airline.name}</p>
//             <p className="text-sm">From: {flight.departure.airport} - To: {flight.arrival.airport}</p>
//             <p className="text-sm">Departure Time: {flight.departure.scheduled}</p>
//             <p className="text-sm">Status: {flight.flight_status}</p>
//             <button
//               onClick={() => handleBooking(flight)}
//               className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
//             >
//               Book Now
//             </button>
//           </div>
//         ))
//       ) : (
//         <p>No flights found for the selected route.</p>
//       )}

//       {selectedFlight && (
//         <FlightBookingForm
//           flight={selectedFlight}
//           onBookingSuccess={handleBookingSuccess}
//           onClose={handleCloseForm}
//         />
//       )}

//       {bookingDetails && (
//         <BookingConfirmationModal
//           bookingDetails={bookingDetails}
//           onClose={handleCloseConfirmation}
//         />
//       )}
//     </div>
//   );
// };

// export default FlightResults;
