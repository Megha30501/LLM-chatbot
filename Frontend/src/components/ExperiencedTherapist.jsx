import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, MessageCircle, User } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; 

const ExperiencedTherapist = ({ onReset }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'patient',
      message: "I'm only here because my counselor at the recovery center said I should address my... trauma issues. I'm not sure how this is going to help after all these years.",
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
    
      const token = localStorage.getItem('authToken'); 
      
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message: therapistMessage,
        session_type: 'hard' 
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log("API Response:", response.data); 
      
      const newResponse = {
        sender: 'patient',
        message: response.data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prev => [...prev, newResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const fallbackResponse = {
        sender: 'patient',
        message: "I'm sorry... it's hard for me to talk about this right now. Can we... maybe try a different approach?",
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
            <h2 className="text-xl font-bold">PTSD Treatment Scenario</h2>
            <p className="text-indigo-100 text-sm">Session with Aisha</p>
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
          <span className="font-medium text-indigo-800">Patient info:</span> Aisha is a 48-year-old African American woman with PTSD from multiple traumas, including childhood sexual abuse, sexual assault, and severe domestic violence. She's been sober for 9 months and wants to improve her relationship with her daughter and grandchild.
        </p>
        <p className="text-gray-700 text-sm mt-2">
          <span className="font-medium text-indigo-800">Your challenge:</span> Practice Written Exposure Therapy techniques for PTSD treatment while building trust with a patient who has experienced complex trauma.
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
                    {chat.sender === 'patient' ? 'Aisha' : 'You'} · {chat.timestamp}
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
                  <span className="text-xs text-gray-500">Aisha is typing...</span>
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

export default ExperiencedTherapist;