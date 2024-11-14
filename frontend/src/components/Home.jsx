import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-light min-h-screen flex flex-col items-center text-gray-900">
      {/* Hero Section */}
      <header
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?travel,airplane)' }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-5xl font-extrabold mb-4">Discover Your Next Destination</h1>
          <p className="text-xl max-w-md mb-8">
            Book flights with ease and explore a world of destinations. Start your adventure today.
          </p>
          <Link
            to="/search"
            className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold transition duration-300"
          >
            Explore Flights
          </Link>
        </div>
      </header>

      {/* Highlights Section */}
      <section className="w-full max-w-6xl mx-auto py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
            <img src="https://source.unsplash.com/200x200/?plane,travel" alt="Quick Booking" className="w-16 h-16 mx-auto mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Effortless Booking</h3>
            <p>Book your flights quickly with a seamless interface and secure payments.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
            <img src="https://source.unsplash.com/200x200/?discount,travel" alt="Affordable Deals" className="w-16 h-16 mx-auto mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
            <p>Benefit from exclusive deals and discounts on popular routes.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
            <img src="https://source.unsplash.com/200x200/?globe,explore" alt="Worldwide Access" className="w-16 h-16 mx-auto mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p>Find flights to countless destinations and get ready for your next journey.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-10">User Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <p className="text-lg italic mb-2">"Fantastic experience! Booking flights has never been easier."</p>
              <p className="text-right font-semibold">- Alex M.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <p className="text-lg italic mb-2">"Highly recommended! I found amazing deals and saved money."</p>
              <p className="text-right font-semibold">- Mia T.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sign-up Call to Action */}
      <section className="w-full py-16 bg-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
          <p className="text-lg mb-6">Join us today and unlock a world of travel opportunities.</p>
          <Link
            to="/signup"
            className="inline-block px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
