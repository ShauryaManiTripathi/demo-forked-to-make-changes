import React, { useState, useEffect, useRef } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your healthcare assistant. How can I help you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (inputValue.trim() === "") return;

    // Add user message to chat
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Prepare the request to Gemini API
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // In production, you'd want to use environment variables for API keys
          // and implement proper backend proxy to protect the key
          "x-goog-api-key": process.env.REACT_APP_GEMINI_API_KEY || "AIzaSyBQk48R2XKRCxV2fm53Rvf7JvhdR6nRlFQ"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `You are a specialized healthcare reimbursement assistant for our digital platform. 
              Your role is to help users with the reimbursement process for medical expenses.
              
              Guidelines:
              - Provide clear, concise information about reimbursement procedures
              - Answer questions about eligibility requirements and documentation needed
              - Explain application submission processes and timelines
              - Help troubleshoot common reimbursement issues
              - Guide users on checking application status
              - Maintain a professional, supportive tone
              - Do not use markdown formatting in your responses
              - Avoid making specific promises about approval outcomes
              - Don't request or store personal health information
              - If unsure, suggest contacting customer support
              
              User query: ${inputValue}` }]
          }]
        })
      });

      const data = await response.json();
      
      // Handle API response
      if (data.candidates && data.candidates.length > 0 && 
          data.candidates[0].content && data.candidates[0].content.parts) {
        
        const aiResponse = { 
          text: data.candidates[0].content.parts[0].text, 
          isUser: false 
        };
        
        setMessages(prev => [...prev, aiResponse]);
      } else {
        // Fallback response if API returns unexpected format
        setMessages(prev => [...prev, { 
          text: "I'm sorry, I couldn't process that request. Can you try asking something else?", 
          isUser: false 
        }]);
      }
    } catch (error) {
      console.error("Error sending message to AI:", error);
      setMessages(prev => [...prev, { 
        text: "Sorry, there was an error connecting to the assistant. Please try again later.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col" style={{ height: "500px" }}>
          {/* Header */}
          <div className="bg-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="ml-2 text-white font-medium">Health Assistant</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-3 flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-3/4 p-3 rounded-lg ${
                    message.isUser 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-200 p-3 rounded-lg rounded-bl-none text-gray-800">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default Chatbot;