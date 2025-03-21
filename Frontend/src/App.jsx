import React, { useState } from 'react';
import './index.css';
import LandingPage from './components/LandingPage';
import ExperiencedTherapist from './components/ExperiencedTherapist';
import NewToTherapy from './components/NewToTherapy';
import Registration from './components/Registration';
import Login from './components/Login';


function App() {
  const [currentView, setCurrentView] = useState('login');

  const [selectedOption, setSelectedOption] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('landing');
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setCurrentView('landing');
  };

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
    setCurrentView('landing');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
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
  const renderView = () => {
    switch (currentView) {
      case 'login':
        return (
          <Login 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setCurrentView('register')} 
          />
        );
      case 'register':
        return (
          <Registration 
            onRegister={handleRegister} 
            onSwitchToLogin={() => setCurrentView('login')} 
          />
        );
      case 'landing':
        return <LandingPage onOptionSelect={handleOptionSelect} />;
      case 'experienced':
        return <ExperiencedTherapist onReset={handleReset} />;
      case 'new':
        return <NewToTherapy onReset={handleReset} />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {user && (
        <div className="w-full max-w-4xl flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-indigo-700">Therapy Practice Simulator</h1>
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">Welcome, {user.firstName || user.email.split('@')[0]}</span>
            <button
              onClick={handleLogout}
              className="bg-white hover:bg-gray-50 text-indigo-600 px-4 py-2 rounded-lg text-sm border border-gray-200 shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      
      {/* Main content */}
      {!selectedOption ? (
        renderView() 
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
};

export default App;