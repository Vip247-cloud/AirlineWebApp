// src/components/FlightSearch.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FlightSearch = ({ onSearch }) => {
  const [originAirport, setOriginAirport] = useState('');
  const [destinationAirport, setDestinationAirport] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  const searchFlights = async () => {
    try {
      const response = await axios.get(`https://api.aviationstack.com/v1/flights`, {
        params: {
          origin: originAirport,
          destination: destinationAirport,
          date: departureDate,
          access_key: '96ea05bc4e6bf9d1ec5585f2f3b9854b', // Replace with actual API key
        },
      });

      // Filter flights based on user input and ensure data fields are valid
      const validFlights = response.data.data.filter((flight) => {
        const validArrival = flight.arrival && flight.arrival.airport;
        const validDeparture = flight.departure && flight.departure.airport;
        const validFlightDate = flight.flight_date;

        return (
          validArrival &&
          validDeparture &&
          validFlightDate &&
          flight.arrival.airport.toUpperCase() === originAirport.toUpperCase() &&
          flight.departure.airport.toUpperCase() === destinationAirport.toUpperCase() &&
          flight.flight_date === departureDate
        );
      });

      // Send the filtered flights to the parent component
      onSearch(validFlights);
    } catch (error) {
      console.error('Error fetching flight data:', error);
      alert('Unable to fetch flights. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Search for Flights</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Origin Airport</label>
        <input
          type="text"
          value={originAirport}
          onChange={(e) => setOriginAirport(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded"
          placeholder="Enter origin airport"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Destination Airport</label>
        <input
          type="text"
          value={destinationAirport}
          onChange={(e) => setDestinationAirport(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded"
          placeholder="Enter destination airport"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Departure Date</label>
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={searchFlights}
        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
      >
        Find Flights
      </button>
    </div>
  );
};

export default FlightSearch;
