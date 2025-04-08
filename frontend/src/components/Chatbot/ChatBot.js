import React, { useState, useEffect, useRef } from "react";

function Chatbot() {
  // Load conversation history from localStorage or use default initial message
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem("chatHistory");
    return stored
      ? JSON.parse(stored)
      : [{ text: "Hello! I'm your healthcare assistant. How can I help you today?", isUser: false }];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Update scroll and persist history to localStorage
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const toggleChat = () => setIsOpen(prev => !prev);
  const handleInputChange = (e) => setInputValue(e.target.value);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // Add the new user message to conversation history
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    // Prepare full conversation context with guide
    const conversationContext = messages
      .map(m => (m.isUser ? `User: ${m.text}` : `Assistant: ${m.text}`))
      .join("\n");
    
    // Pre-prompt with detailed guidelines
    const prePrompt = `You are a specialized healthcare reimbursement assistant for our digital platform.
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

The conversation so far:
${conversationContext}
User Query: ${inputValue}`;

    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.REACT_APP_GEMINI_API_KEY || "X"
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prePrompt }]
            }]
          })
        }
      );

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content?.parts) {
        const aiResponse = { text: data.candidates[0].content.parts[0].text, isUser: false };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        setMessages(prev => [
          ...prev,
          { text: "I'm sorry, I couldn't process that request. Can you try asking something else?", isUser: false }
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [
        ...prev,
        { text: "Sorry, there was an error connecting to the assistant. Please try again later.", isUser: false }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col" style={{ height: "500px" }}>
          {/* Chat header */}
          <div className="bg-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="ml-2 text-white font-medium">Health Assistant</h3>
            </div>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`mb-3 flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-3/4 p-3 rounded-lg ${message.isUser ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}`}>
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
          {/* Chat input */}
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
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isLoading}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Floating chat toggle button */}
      <button onClick={toggleChat} className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all">
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
