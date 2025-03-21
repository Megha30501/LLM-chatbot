// import React, { useState } from 'react';
// import { ArrowRight, MessageCircle } from 'lucide-react';

// const ExperiencedTherapist = ({ onReset }) => {
//   const [response, setResponse] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle response submission here
//     console.log('Therapist response:', response);
//     setResponse('');
//     // Future implementation: Add AI response logic
//   };

//   return (
//     <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
//       <div className="p-6 bg-indigo-600 text-white flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-bold">Challenging Patient Scenario</h2>
//           <p className="text-indigo-100 text-sm">Practice with a resistant or complex client</p>
//         </div>
//         <button 
//           onClick={onReset}
//           className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg text-sm"
//         >
//           Start Over
//         </button>
//       </div>
      
//       <div className="p-6">
//         <div className="border-2 border-gray-200 rounded-lg p-4 mb-6">
//           <div className="flex items-center mb-4">
//             <div className="bg-indigo-100 p-2 rounded-full mr-3">
//               <MessageCircle size={20} className="text-indigo-600" />
//             </div>
//             <p className="font-medium text-gray-800">Meet Alex, your challenging patient</p>
//           </div>
          
//           <p className="text-gray-600 mb-4">
//             Alex is resistant to therapy, often deflects with humor, and challenges your methods. 
//             They've been to several therapists before and are skeptical about the process.
//           </p>
          
//           <div className="bg-gray-100 p-3 rounded-lg">
//             <p className="italic text-gray-700">
//               "Look, I'm only here because my partner insisted. I don't really think this will help."
//             </p>
//           </div>
//         </div>
        
//         <div className="bg-gray-50 p-4 rounded-lg mb-6">
//           <h3 className="font-medium text-gray-700 mb-2">Your challenge:</h3>
//           <p className="text-gray-600">
//             Build rapport with a skeptical client and navigate resistance while identifying underlying issues.
//           </p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg">
//           <h3 className="font-medium text-indigo-800 mb-2">How to respond:</h3>
//           <p className="text-indigo-700 mb-4">Type your response as you would in a real session.</p>
          
//           <div className="relative">
//             <textarea 
//               className="w-full border-2 border-gray-300 rounded-lg p-3 pr-12 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
//               rows="3"
//               placeholder="Enter your response..."
//               value={response}
//               onChange={(e) => setResponse(e.target.value)}
//             ></textarea>
//             <button 
//               type="submit"
//               className="absolute right-3 bottom-3 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-500 transition"
//             >
//               <ArrowRight size={18} />
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ExperiencedTherapist;

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, MessageCircle, User } from 'lucide-react';

const ExperiencedTherapist = ({ onReset }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'patient',
      message: "Look, I'm only here because my partner insisted. I don't really think this will help.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add therapist message to chat
    const newMessage = {
      sender: 'therapist',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory([...chatHistory, newMessage]);
    setInputMessage('');
    
    // Simulate patient typing response
    simulatePatientResponse();
  };
  
  const simulatePatientResponse = () => {
    setIsTyping(true);
    
    // Simulate API call delay (2-4 seconds) - in a real app this would be an actual API call
    const delay = 2000 + Math.random() * 2000;
    
    setTimeout(() => {
      // Get response for resistant patient
      const patientResponse = generateResistantPatientResponse();
      
      // Add patient response to chat
      const newResponse = {
        sender: 'patient',
        message: patientResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prev => [...prev, newResponse]);
      setIsTyping(false);
    }, delay);
  };
  
  const generateResistantPatientResponse = () => {
    const resistantResponses = [
      "I'm not sure this is going to help me.",
      "My last therapist said basically the same thing.",
      "That's an interesting approach, but I've tried something similar before.",
      "I understand what you're saying, but I don't think you get my situation.",
      "Can we try something different? This isn't really working for me.",
      "Yeah, that's what my partner says too. Everyone thinks they know what's best for me.",
      "I've heard all this before. It's just textbook stuff.",
      "*sighs* Let's just move on to something else.",
      "I don't see how this connects to my actual problems.",
      "Maybe this works for other people, but my situation is different."
    ];
    
    return resistantResponses[Math.floor(Math.random() * resistantResponses.length)];
  };
  
  return (
    <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl overflow-hidden flex flex-col h-[600px]">
      <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-indigo-500 p-2 rounded-full mr-3">
            <MessageCircle size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Challenging Patient Scenario</h2>
            <p className="text-indigo-100 text-sm">Session with Alex</p>
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
          <span className="font-medium text-indigo-800">Patient info:</span> Alex is resistant to therapy, often deflects with humor, and challenges your methods. They've been to several therapists before and are skeptical about the process.
        </p>
        <p className="text-gray-700 text-sm mt-2">
          <span className="font-medium text-indigo-800">Your challenge:</span> Build rapport with a skeptical client and navigate resistance while identifying underlying issues.
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
                    {chat.sender === 'patient' ? 'Alex' : 'You'} · {chat.timestamp}
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
                  <span className="text-xs text-gray-500">Alex is typing...</span>
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
            className="flex-grow border-2 border-gray-300 rounded-lg p-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
            rows="2"
            placeholder="Type your response as you would in a real session..."
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