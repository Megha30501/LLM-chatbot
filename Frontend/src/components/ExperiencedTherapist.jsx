import React, { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

const ExperiencedTherapist = ({ onReset }) => {
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle response submission here
    console.log('Therapist response:', response);
    setResponse('');
    // Future implementation: Add AI response logic
  };

  return (
    <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 bg-indigo-600 text-white flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Challenging Patient Scenario</h2>
          <p className="text-indigo-100 text-sm">Practice with a resistant or complex client</p>
        </div>
        <button 
          onClick={onReset}
          className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg text-sm"
        >
          Start Over
        </button>
      </div>
      
      <div className="p-6">
        <div className="border-2 border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-indigo-100 p-2 rounded-full mr-3">
              <MessageCircle size={20} className="text-indigo-600" />
            </div>
            <p className="font-medium text-gray-800">Meet Alex, your challenging patient</p>
          </div>
          
          <p className="text-gray-600 mb-4">
            Alex is resistant to therapy, often deflects with humor, and challenges your methods. 
            They've been to several therapists before and are skeptical about the process.
          </p>
          
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="italic text-gray-700">
              "Look, I'm only here because my partner insisted. I don't really think this will help."
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Your challenge:</h3>
          <p className="text-gray-600">
            Build rapport with a skeptical client and navigate resistance while identifying underlying issues.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg">
          <h3 className="font-medium text-indigo-800 mb-2">How to respond:</h3>
          <p className="text-indigo-700 mb-4">Type your response as you would in a real session.</p>
          
          <div className="relative">
            <textarea 
              className="w-full border-2 border-gray-300 rounded-lg p-3 pr-12 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
              rows="3"
              placeholder="Enter your response..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            ></textarea>
            <button 
              type="submit"
              className="absolute right-3 bottom-3 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-500 transition"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperiencedTherapist;