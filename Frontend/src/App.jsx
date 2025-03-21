// App.jsx
import React, { useState } from 'react';
import './index.css';
import LandingPage from './components/LandingPage';
import ExperiencedTherapist from './components/ExperiencedTherapist';
import NewToTherapy from './components/NewToTherapy';

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowChatbot(true);
    }, 1500);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setShowChatbot(false);
  };

  const LoadingScreen = () => (
    <div className="bg-white p-12 rounded-xl shadow-lg text-center">
      <div className="animate-spin w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-6"></div>
      <p className="text-gray-700">
        {selectedOption === 'experienced'
          ? "Setting up your challenging patient scenario..."
          : "Preparing your training scenario..."}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {!selectedOption ? (
        <LandingPage onOptionSelect={handleOptionSelect} />
      ) : loading ? (
        <LoadingScreen />
      ) : (
        <>
          {selectedOption === 'experienced' ? (
            <ExperiencedTherapist onReset={handleReset} />
          ) : (
            <NewToTherapy onReset={handleReset} />
          )}
        </>
      )}

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>A training tool for mental health professionals</p>
      </div>
    </div>
  );
}

export default App;