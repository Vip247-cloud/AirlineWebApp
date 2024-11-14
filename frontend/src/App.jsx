
// // src/App.jsx
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import Navbar from './components/Navbar';
// import FlightSearch from './components/FlightSearch';
// import FlightResults from './components/FlightResults';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import Home from './components/Home';
// import Profile from './components/Profile';  // Import Profile component

// function App() {
//   const [flights, setFlights] = useState([]);
//   const [isSearchDone, setIsSearchDone] = useState(false);
//   const [user, setUser] = useState(null); // Track authenticated user

//   useEffect(() => {
//     // Listen for auth state changes
//     const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//       setUser(currentUser);
//     });
//     return unsubscribe; // Cleanup on unmount
//   }, []);

//   const handleFlightSearch = (flightsData) => {
//     setFlights(flightsData);
//     setIsSearchDone(true);
//   };

//   return (
//     <Router>
//       <div>
//         <Navbar user={user} /> {/* Pass user prop to Navbar */}
//         <main className="p-8">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/signup" element={<SignUp />} />

//             {/* Protected route for FlightSearch */}
//             <Route 
//               path="/search" 
//               element={user ? <FlightSearch onSearch={handleFlightSearch} /> : <Navigate to="/signin" />} 
//             />

//             {/* Protected route for Profile */}

//             {/* // Add this route in the <Routes> section */}
//             <Route path="/profile" element={<Profile onSearch={handleFlightSearch} />} />

//           </Routes>

//           {/* Conditionally show flight results after search */}
//           {isSearchDone && <FlightResults flights={flights} />}
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;



// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebaseConfig'; // Ensure the path matches your configuration
import Navbar from './components/Navbar';
import FlightSearch from './components/FlightSearch';
import FlightResults from './components/FlightResults';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Profile from './components/Profile';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Subscribe to authentication changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // Clean up on component unmount
  }, []);

  const handleFlightSearch = (flightsData) => {
    setFlights(flightsData);
    setSearchCompleted(true);
  };

  return (
    <Router>
      <div className="app">
        <Navbar user={user} /> {/* Navbar will dynamically reflect user's auth state */}
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/profile" replace />} />
            <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/profile" replace />} />

            {/* Protected route for authenticated users */}
            <Route
              path="/search"
              element={user ? <FlightSearch onSearch={handleFlightSearch} /> : <Navigate to="/signin" replace />}
            />

            {/* Protected route for Profile, requiring authentication */}
            <Route
              path="/profile"
              element={user ? <Profile onSearch={handleFlightSearch} /> : <Navigate to="/signin" replace />}
            />
          </Routes>

          {/* Conditionally render flight results if search is completed */}
          {searchCompleted && flights.length > 0 && (
            <FlightResults flights={flights} />
          )}
        </main>
      </div>
    </Router>
  );
};

export default App;
