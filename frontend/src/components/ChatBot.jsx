// ChatBot.jsx
import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

// Website data context
const WebsiteDataContext = createContext({});

// Website data provider component
export const WebsiteDataProvider = ({ children }) => {
    const location = useLocation();
    const [websiteData, setWebsiteData] = useState({});

    useEffect(() => {
        // Gather job portal specific data
        const pageTitle = document.title;
        const mainContent = document.querySelector('main')?.textContent ||
            document.body.textContent;

        // Look for job-specific information on the page
        const jobTitle = document.querySelector('[data-job-title]')?.textContent || '';
        const companyName = document.querySelector('[data-company-name]')?.textContent || '';
        const jobDescription = document.querySelector('[data-job-description]')?.textContent || '';

        setWebsiteData({
            path: location.pathname,
            title: pageTitle,
            content: mainContent?.slice(0, 1000) || '',
            jobInfo: {
                title: jobTitle,
                company: companyName,
                description: jobDescription,
            },
            pageType: getPageType(location.pathname)
        });
    }, [location]);

    // Helper to determine what type of page we're on
    const getPageType = (path) => {
        if (path === '/') return 'home';
        if (path.includes('/jobs')) return 'jobs';
        if (path.includes('/description')) return 'job-description';
        if (path.includes('/company')) return 'company';
        if (path.includes('/profile')) return 'profile';
        if (path.includes('/admin')) return 'admin';
        if (path.includes('/signup') || path.includes('/login')) return 'auth';
        return 'other';
    };

    return (
        <WebsiteDataContext.Provider value={websiteData}>
            {children}
        </WebsiteDataContext.Provider>
    );
};

// Hook to use website data
const useWebsiteData = () => useContext(WebsiteDataContext);

// ChatBot component
const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I can help with your job search and application questions. How may I assist you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const websiteData = useWebsiteData();

    // Get API key from environment
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Show welcome popup after a delay when the site loads
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
            // Auto-hide popup after 8 seconds if user doesn't interact
            const hideTimer = setTimeout(() => {
                setShowPopup(false);
            }, 8000);

            return () => clearTimeout(hideTimer);
        }, 2000); // 2 second delay before showing popup

        return () => clearTimeout(timer);
    }, []);

    const getWelcomeMessage = () => {
        // Customize welcome message based on page type
        const pageType = websiteData.pageType;

        if (pageType === 'job-description') {
            return "I see you're looking at a job posting. Need help with your application?";
        } else if (pageType === 'jobs') {
            return "Finding the perfect job? I can help with your search!";
        } else if (pageType === 'admin') {
            return "Hello recruiter! Need assistance with postings or candidates?";
        } else if (pageType === 'home') {
            return "Hey there! 👋 Looking for your dream job? I can help you find it!";
        }

        return "Hey there! 👋 Need help with your job search?";
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: input }]);
        setInput('');
        setLoading(true);

        try {
            // Check if API key is available
            if (!API_KEY) {
                throw new Error('Gemini API key is not configured');
            }

            // Create job context message
            let contextMessage = `You are an AI assistant for a job portal website. `;
            contextMessage += `Current page: ${websiteData.title} (${websiteData.path}). `;

            if (websiteData.pageType === 'job-description' && websiteData.jobInfo.title) {
                contextMessage += `You're viewing a job: ${websiteData.jobInfo.title} at ${websiteData.jobInfo.company}. `;
            } else if (websiteData.pageType === 'jobs') {
                contextMessage += `You're browsing job listings. `;
            } else if (websiteData.pageType === 'admin') {
                contextMessage += `You're in the admin/recruiter section. `;
            }

            contextMessage += `User question: ${input}`;

            // Create the request payload using the exact format from the curl command
            const payload = {
                contents: [{
                    parts: [{ text: contextMessage }]
                }]
            };

            // Use the gemini-2.0-flash model as shown in the curl command
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

            console.log("Sending request to Gemini API...");

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            console.log("Received response:", data);

            // Extract the response text from the API response
            let responseText = "";

            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                // Extract text from parts
                const parts = data.candidates[0].content.parts;
                if (parts && parts.length > 0) {
                    responseText = parts.map(part => part.text).join(" ");
                }
            }

            if (!responseText) {
                responseText = "I'm sorry, I couldn't generate a response.";
            }

            setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
        } catch (error) {
            console.error('Error with Gemini API:', error);

            // Display a user-friendly error message
            let errorMessage = "I'm having trouble connecting to the AI service right now.";

            if (error.message.includes('API key')) {
                errorMessage = "The chatbot couldn't authenticate with the AI service. Please check your API key.";
            } else if (error.message.includes('quota')) {
                errorMessage = "You've reached the limit for the free Gemini API tier. Please try again later.";
            } else if (error.message.includes('not found') || error.message.includes('not supported')) {
                errorMessage = "There's an issue with the AI model configuration. Please verify your API is set up correctly.";
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: errorMessage
            }]);
        } finally {
            setLoading(false);
        }
    };

    // Handle enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Open chat when clicking on welcome popup
    const handlePopupClick = () => {
        setIsOpen(true);
        setShowPopup(false);
    };

    return (
        <div className="fixed bottom-14 right-10 z-50 flex flex-col items-end">
            {/* Welcome popup message */}
            {showPopup && !isOpen && (
                <div
                    onClick={handlePopupClick}
                    className="mb-4 bg-white rounded-lg shadow-lg p-4 max-w-xs animate-fadeIn cursor-pointer border border-blue-200 hover:border-blue-300 transition-all"
                >
                    <div className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-800 font-medium">{getWelcomeMessage()}</p>
                            <p className="text-sm text-blue-600 mt-1">Click to chat with me</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat button - with robot icon */}
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    setShowPopup(false);
                }}
                className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    // Robot icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                )}
            </button>

            {/* Chat window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
                        <div className="flex items-center">
                            {/* Small robot icon in header */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                            <h3 className="font-medium">Job Assistant</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200"
                            aria-label="Close chat"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`mb-3 ${msg.role === 'user' ? 'ml-auto' : 'mr-auto'}`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-lg inline-block max-w-[75%] ${
                                        msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                    }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="mb-3 mr-auto">
                                <div className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg rounded-bl-none inline-block">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input area */}
                    <div className="border-t border-gray-200 p-3 bg-white">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about jobs, applications, etc..."
                                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                aria-label="Chat message"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={loading || !input.trim()}
                                className={`ml-2 w-10 h-10 rounded-full flex items-center justify-center ${
                                    loading || !input.trim()
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                } text-white`}
                                aria-label="Send message"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add CSS animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default ChatBot;