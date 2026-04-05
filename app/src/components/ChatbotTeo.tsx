import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { teoResponses, defaultTeoResponse } from '@/data/sociologyData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatbotTeo() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Halo! Saya Teo, asisten sosiologi virtualmu. Ada yang bisa saya bantu? Tanyakan tentang teori, karir, atau konsep sosiologi!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input saat chat dibuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Fungsi untuk mencari response yang sesuai
  const findResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const response of teoResponses) {
      if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return response.response;
      }
    }
    
    return defaultTeoResponse;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulasi delay response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'Apa itu sosiologi?',
    'Teori Marx',
    'Karir lulusan',
    'Imajinasi sosiologis'
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-navy to-sage text-white shadow-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center group ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Buka chat dengan Teo"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber rounded-full animate-pulse" />
      </button>

      {/* Chat Modal */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden ${
          isOpen
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{ height: isOpen ? '500px' : '0' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-navy via-navy-light to-sage p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-poppins font-semibold text-white">Teo</h3>
              <p className="text-xs text-white/80">Asisten Sosiologi Virtual</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Tutup chat"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" style={{ height: 'calc(100% - 140px)' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'bot'
                    ? 'bg-gradient-to-br from-navy to-sage'
                    : 'bg-amber'
                }`}
              >
                {message.sender === 'bot' ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-navy" />
                )}
              </div>
              <div
                className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                  message.sender === 'bot'
                    ? 'bg-white text-slate-700 rounded-tl-none shadow-sm'
                    : 'bg-navy text-white rounded-tr-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy to-sage flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length < 3 && (
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-2">Pertanyaan cepat:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInputValue(q);
                    inputRef.current?.focus();
                  }}
                  className="text-xs px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-sage hover:text-sage transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tanyakan sesuatu..."
              className="flex-1 px-4 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-navy to-sage text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all"
              aria-label="Kirim pesan"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
