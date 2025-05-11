
import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: 'Hello! How can I help you today?', isUser: false }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    setMessages([...messages, { text: newMessage, isUser: true }]);
    setNewMessage('');

    // Simulate response after a short delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          text: 'Thank you for your message. Our team will get back to you shortly.', 
          isUser: false 
        }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Chat button */}
      <button
        className="fixed bottom-6 right-6 z-40 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all"
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in">
          {/* Header */}
          <div className="bg-primary text-white p-4">
            <h3 className="font-semibold">Chat with Us</h3>
            <p className="text-xs opacity-75">We'll respond as soon as possible</p>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`max-w-[75%] p-3 rounded-lg text-sm ${
                  msg.isUser 
                    ? 'bg-primary/10 dark:bg-primary/20 ml-auto' 
                    : 'bg-gray-100 dark:bg-gray-700 mr-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 dark:border-gray-700 p-3 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-primary"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-white p-2 rounded-md hover:bg-primary/90 transition-colors"
              disabled={!newMessage.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
