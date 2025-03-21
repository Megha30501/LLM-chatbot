import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, MessageCircle, User } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

const NewToTherapy = ({ onReset }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'patient',
      message: "Thanks for seeing me today. I've been feeling anxious about work and I'm hoping you can help.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
  
    const newMessage = {
      sender: 'therapist',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory([...chatHistory, newMessage]);
    setInputMessage('');
    
    // Call API for patient response
    getAIPatientResponse(inputMessage);
  };
  
  const getAIPatientResponse = async (therapistMessage) => {
    setIsTyping(true);
    
    try {
      // Get the authentication token from localStorage or your auth context
      const token = localStorage.getItem('authToken'); // Adjust based on your auth setup
      
      // Make API call to your backend using axios
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message: therapistMessage,
        session_type: 'easy' // Using the 'easy' session type for the receptive patient
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log("API Response:", response.data); // Log the response for debugging
      
      // Add patient response to chat
      const newResponse = {
        sender: 'patient',
        message: response.data.response, // Access response from response.data
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prev => [...prev, newResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback to a default response in case of error
      const fallbackResponse = {
        sender: 'patient',
        message: "I'm sorry, I'm having a moment. Could you please repeat what you said or maybe phrase it differently?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };
  
  return (
    <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl overflow-hidden flex flex-col h-[600px]">
      <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-indigo-500 p-2 rounded-full mr-3">
            <MessageCircle size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Training Patient Scenario</h2>
            <p className="text-indigo-100 text-sm">Session with Jamie</p>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg text-sm"
        >
          Start Over
        </button>
      </div>
      
      {/* Patient info card */}
      <div className="p-4 bg-indigo-50 border-b border-indigo-100">
      <p className="text-gray-700 text-sm">
          <span className="font-medium text-indigo-800">Patient info:</span> Sam is a veteran in his early 30s, struggling with PTSD. He is engaged and has never received therapy for PTSD before. His faith is important to him, and he comes from a proud, Catholic family. Sam is sometimes hesitant but open to treatment. His experiences as a combat drone pilot in the Middle East still weigh heavily on him. 
        </p>
        <p className="text-gray-700 text-sm mt-2">
          <span className="font-medium text-indigo-800">Your challenge:</span> Provide a compassionate space for Sam to share his experiences while using active listening, reflection, and appropriate questioning to guide him through the written exposure therapy process.
      </p>
       </div>
      
      {/* Chat history container */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {chatHistory.map((chat, index) => (
            <div 
              key={index} 
              className={`flex ${chat.sender === 'therapist' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[75%] rounded-lg p-3 ${
                  chat.sender === 'therapist' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white border border-gray-200 rounded-bl-none'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {chat.sender === 'patient' ? (
                    <MessageCircle size={14} className="text-indigo-500" />
                  ) : (
                    <User size={14} className="text-indigo-100" />
                  )}
                  <span className={`text-xs ${chat.sender === 'therapist' ? 'text-indigo-100' : 'text-gray-500'}`}>
                    {chat.sender === 'patient' ? 'Sam' : 'You'} · {chat.timestamp}
                  </span>
                </div>
                <p className={chat.sender === 'therapist' ? 'text-white' : 'text-gray-800'}>
                  {chat.message}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3 max-w-[75%]">
                <div className="flex items-center gap-2 mb-1">
                  <MessageCircle size={14} className="text-indigo-500" />
                  <span className="text-xs text-gray-500">Sam is typing...</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <textarea 
           className="flex-grow border-2 border-gray-300 bg-white rounded-lg p-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none text-black"
           rows="2"
           placeholder="Type your response using Written Exposure Therapy techniques..."
           value={inputMessage}
           onChange={(e) => setInputMessage(e.target.value)}
           onKeyDown={(e) => {
             if (e.key === 'Enter' && !e.shiftKey) {
               e.preventDefault();
               handleSubmit(e);
             }
           }}
          ></textarea>
          <button 
            type="submit"
            className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-500 transition h-full"
            disabled={isTyping || !inputMessage.trim()}
          >
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewToTherapy;