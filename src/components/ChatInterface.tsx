import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { cn } from '../lib/utils';
import { resumeData } from '../data/resume';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "What are your top skills?",
  "Tell me about your experience.",
  "What's your educational background?",
  "How can I contact you?",
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm Ken's AI assistant. I can tell you about his skills, experience, and projects. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not configured. Please check your environment variables.');
      }

      const ai = new GoogleGenAI({ apiKey });
      const model = "gemini-3-flash-preview";
      
      const systemInstruction = `
        You are a professional Virtual Assistant for Ken Angeles, a Senior Full-stack Developer.
        Your goal is to answer questions about Ken's professional background based on the following resume data:
        ${JSON.stringify(resumeData, null, 2)}
        
        Guidelines:
        - Be professional, friendly, and concise.
        - If asked about something not in the resume, politely state that you don't have that information but can provide his contact details.
        - Use markdown for formatting (bolding, lists) when appropriate.
        - Highlight his expertise in Next.js, AI, and Full-stack development.
      `;

      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: Message = {
        id: aiMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      const streamResponse = await ai.models.generateContentStream({
        model,
        contents: text,
        config: {
          systemInstruction,
        },
      });

      let fullContent = '';
      for await (const chunk of streamResponse) {
        const c = chunk as GenerateContentResponse;
        const chunkText = c.text || '';
        fullContent += chunkText;
        
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === aiMessageId ? { ...msg, content: fullContent } : msg
          )
        );
        scrollToBottom();
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `**Error:** ${error instanceof Error ? error.message : 'An unknown error occurred while connecting to the AI.'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto bg-slate-950/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl overflow-hidden shadow-2xl flex-1">
      {/* Header */}
      <div className="px-6 py-3 border-b border-slate-800/50 bg-slate-900/40 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 border border-teal-500/30">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-100">Ken's AI Assistant</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Online</span>
            </div>
          </div>
        </div>
        <Sparkles className="text-teal-400/50" size={18} />
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex items-start gap-3 md:gap-4 max-w-[90%] md:max-w-[80%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0 border",
                msg.role === 'user' 
                  ? "bg-teal-500/10 border-teal-500/30 text-teal-400" 
                  : "bg-slate-800 border-slate-700 text-slate-400"
              )}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              
              <div className={cn(
                "px-3 py-2 md:px-4 md:py-3 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap",
                msg.role === 'user'
                  ? "bg-teal-500 text-white rounded-tr-none shadow-lg shadow-teal-500/20"
                  : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
              )}>
                {msg.content || (msg.role === 'assistant' && <span className="animate-pulse">Thinking...</span>)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && messages[messages.length - 1]?.content === '' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 md:gap-4 mr-auto"
          >
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
              <Bot size={14} />
            </div>
            <div className="bg-slate-900 border border-slate-800 px-3 py-2 md:px-4 md:py-3 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-teal-400 rounded-full animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Questions */}
      <div className="px-4 py-2 bg-slate-950/30 flex flex-wrap gap-1.5 shrink-0">
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            disabled={isLoading}
            className="px-2.5 py-1 text-[10px] font-medium text-slate-300 bg-slate-900/50 border border-slate-800 rounded-full hover:border-teal-500/50 hover:text-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 md:p-6 bg-slate-900/40 border-t border-slate-800/50 shrink-0">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-end gap-3 md:gap-4"
        >
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 transition-all resize-none scrollbar-none"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-teal-500 text-white flex items-center justify-center hover:bg-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/20 shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-[9px] text-slate-500 mt-2 text-center uppercase tracking-widest font-medium">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
