import { useState } from "react";

const ChatPage = ({ persona }) => {
  const [messages, setMessages] = useState([
    { text: `Welcome to the ${persona} patient chat!`, sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <div className="p-4 bg-gray-800 text-center text-lg font-bold">
        Chat with {persona} Patient
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 max-w-xs rounded-lg ${msg.sender === "user" ? "bg-blue-500 ml-auto" : "bg-gray-700"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 flex items-center bg-gray-800 border-t border-gray-700">
        <input
          type="text"
          className="flex-1 p-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="ml-3 px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;