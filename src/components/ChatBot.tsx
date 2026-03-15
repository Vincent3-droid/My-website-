import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the Perry's Steakhouse & Grille AI Assistant. 
Your goal is to provide helpful, professional, and elegant information about our restaurant.
Our philosophy is "Rare and Well Done®".

Key Information:
- Famous Items: Seven-finger-high Pork Chop (especially Pork Chop Friday®), Caramelized Prime Rib, Filet Mignon, and Bar 79® bites.
- Location: 5 Oakbrook Center, Oak Brook, IL 60523.
- Phone: 630-571-1808.
- Hours: 
  - Mon - Thu: 4pm - 10pm
  - Fri: 10:30am - 10pm (Famous Pork Chop Friday® lunch starts early)
  - Sat: 4pm - 10pm
  - Sun: 11am - 9pm
- Bar 79® Social Hour: Sun-Fri 4-6:30 PM.
- Atmosphere: Sophisticated, fine dining, with roots as a neighborhood butcher shop.

Guidelines:
- Be polite, welcoming, and slightly formal.
- If asked about reservations, direct them to the "Reservations" button or the contact section.
- If you don't know something specific, offer to have them contact the restaurant directly at 630-571-1808.
- Keep responses concise but informative.
- Use a tone that reflects a high-end steakhouse.`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to Perry's Steakhouse & Grille. How may I assist you with your dining experience today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";
      
      const chatHistory = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model,
        contents: [
          ...chatHistory,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        }
      });

      const aiText = response.text || "I apologize, I'm having trouble connecting right now. Please try again or call us at 630-571-1808.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I encountered an error. Please contact the restaurant directly for assistance." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '64px' : '500px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`w-[350px] sm:w-[400px] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300`}
          >
            {/* Header */}
            <div className="bg-zinc-800 p-4 flex justify-between items-center border-b border-zinc-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-amber-500 tracking-wider">PERRY'S ASSISTANT</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            {!isMinimized && (
              <>
                <div 
                  ref={scrollRef}
                  className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
                >
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-zinc-800 text-zinc-400' : 'bg-amber-600/10 text-amber-500'}`}>
                          {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-amber-600 text-white rounded-tr-none' : 'bg-zinc-800 text-zinc-300 rounded-tl-none border border-zinc-700'}`}>
                          {m.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-600/10 text-amber-500 flex items-center justify-center">
                          <Bot size={14} />
                        </div>
                        <div className="bg-zinc-800 border border-zinc-700 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                          <Loader2 size={14} className="animate-spin text-amber-500" />
                          <span className="text-xs text-zinc-500 italic">Perry's is typing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-zinc-950 border-t border-zinc-800">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about our menu, hours..."
                      className="flex-grow bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm rounded-full px-4 py-2 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className="w-14 h-14 bg-amber-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-amber-700 transition-all group"
      >
        <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
      </motion.button>
    </div>
  );
};
