import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { defaultTeoResponse } from '@/data/sociologyData';
import { useAdminStore } from '@/store/useAdminStore';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatbotTeo() {
  const teoResponses = useAdminStore((state) => state.teoResponses);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Halo! Saya SociZ, asisten virtual SociZone. Tanyakan apa saja tentang teori sosiologi, konsep kacamata, atau prospek karir!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

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
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-navy to-sage text-white shadow-lg shadow-navy/30 hover:scale-110 transition-all duration-300 flex items-center justify-center group ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
        aria-label="Buka chat dengan SociZ"
      >
        <Sparkles className="w-6 h-6" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-amber rounded-full border-2 border-white animate-pulse" />
        {/* Tooltip */}
        <span className="absolute right-full mr-3 whitespace-nowrap bg-navy text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
          Tanya SociZ ✨
        </span>
      </button>

      {/* Chat Modal */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition-all duration-300 overflow-hidden border border-slate-200 flex flex-col ${
          isOpen
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{ height: isOpen ? '530px' : '0' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-navy to-sage p-4 flex items-center justify-between relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center ring-2 ring-white/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-poppins font-bold text-white text-sm">SociZ</h3>
              <p className="text-xs text-white/70">Asisten Sosiologi Virtual · SociZone</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors text-white/70"
            aria-label="Tutup chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ${
                  message.sender === 'bot' ? 'bg-gradient-to-br from-navy to-sage' : 'bg-amber'
                }`}
              >
                {message.sender === 'bot' ? (
                  <Sparkles className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-navy-dark font-bold" />
                )}
              </div>
              <div
                className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  message.sender === 'bot'
                    ? 'bg-white text-slate-700 rounded-tl-sm border border-slate-100'
                    : 'bg-navy text-white rounded-tr-sm'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy to-sage flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 flex items-center gap-1.5 h-[44px]">
                <span className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions & Input Area */}
        <div className="shrink-0 bg-white border-t border-slate-100 flex flex-col">
          <div className="w-full bg-slate-50/50 pt-3 pb-1 px-3 border-b border-slate-100">
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInputValue(q);
                    inputRef.current?.focus();
                  }}
                  className="text-[11px] whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-sage hover:text-sage hover:bg-sage/5 transition-all font-medium shadow-sm shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 sm:p-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tanya SociZ..."
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage bg-slate-50 transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-navy to-sage text-white flex items-center justify-center disabled:opacity-50 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed hover:shadow-md transition-all"
                aria-label="Kirim pesan"
              >
                <Send className="w-4 h-4 translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}