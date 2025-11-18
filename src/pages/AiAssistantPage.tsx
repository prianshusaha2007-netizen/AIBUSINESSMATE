import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Mic, Send } from 'lucide-react';
import { ChatMessage, CartItem } from '../types';
import { cn } from '../lib/utils';
import { sendMessageToGemini, getIntentFromGemini } from '../lib/gemini';
import { useSpeech } from '../hooks/useSpeech';
import { handleAiAction } from '../lib/ai-actions';
import DraftCartPreview from '../components/ai/DraftCartPreview';

const AiAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [draftCart, setDraftCart] = useState<CartItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { isListening, transcript, startListening, stopListening, speak, isSupported, setTranscript } = useSpeech();

  useEffect(() => {
    // Handle voice input
    if (transcript) {
      handleSend(transcript, true);
      setTranscript(''); // Clear transcript after sending
    }
  }, [transcript]);
  
  useEffect(() => {
    // Auto-scroll chat
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleSend = async (text: string, fromVoice = false) => {
    const trimmedInput = text.trim();
    if (!trimmedInput || isLoading) return;

    addMessage({ role: 'user', parts: [{ text: trimmedInput }], timestamp: new Date() });
    setInput('');
    setIsLoading(true);

    try {
      const intent = await getIntentFromGemini(trimmedInput);
      
      if (intent.action && intent.action !== 'GENERAL_CHAT') {
        const result = await handleAiAction(intent, navigate);
        addMessage({ role: 'system', parts: [{ text: result.message }], timestamp: new Date() });
        if (result.updatedCart) {
          setDraftCart(result.updatedCart);
        }
        if (fromVoice) speak(result.message);
      } else {
        // Fallback to general chat
        const geminiHistory = messages.map(msg => ({ role: msg.role, parts: msg.parts }));
        const responseText = await sendMessageToGemini(geminiHistory, trimmedInput);
        addMessage({ role: 'model', parts: [{ text: responseText }], timestamp: new Date() });
        if (fromVoice) speak(responseText);
      }
    } catch (error) {
      console.error("Error processing AI command:", error);
      const errorMessage = "I encountered an error. Please try again.";
      addMessage({ role: 'model', parts: [{ text: errorMessage }], timestamp: new Date() });
      if (fromVoice) speak(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col rounded-xl border border-slate-800 bg-card">
        {/* Chat Messages */}
        <div className="flex-1 space-y-6 overflow-y-auto p-6" ref={scrollRef}>
          <AnimatePresence initial={false}>
              {messages.length === 0 && (
                   <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex h-full flex-col items-center justify-center text-center text-muted"
                  >
                      <Bot size={48} className="mb-4 text-primary" />
                      <h2 className="text-2xl font-semibold text-foreground">VyaparAI Assistant</h2>
                      <p>Try saying: "Add 2 Dove soaps to the cart"</p>
                  </motion.div>
              )}
            {messages.map((msg, index) => (
              <motion.div
                key={`${msg.timestamp.toISOString()}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={cn(
                  'flex items-start gap-4',
                  msg.role === 'user' && 'justify-end',
                  msg.role === 'system' && 'justify-center'
                )}
              >
                {msg.role === 'model' && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Bot size={20} />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-md rounded-2xl px-4 py-3 text-sm',
                    msg.role === 'user' && 'rounded-br-lg bg-primary text-white',
                    msg.role === 'model' && 'rounded-bl-lg bg-slate-700 text-card-foreground',
                    msg.role === 'system' && 'rounded-md bg-blue-500/10 text-center text-blue-300 italic'
                  )}
                >
                  <p style={{ whiteSpace: 'pre-wrap' }}>{msg.parts[0].text}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 text-card-foreground">
                    <User size={20} />
                  </div>
                )}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-4"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Bot size={20} />
                </div>
                <div className="max-w-md rounded-2xl rounded-bl-lg bg-slate-700 px-4 py-3 text-sm">
                  <div className="flex items-center gap-2 text-muted">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-primary delay-0"></span>
                      <span className="h-2 w-2 animate-pulse rounded-full bg-primary delay-150"></span>
                      <span className="h-2 w-2 animate-pulse rounded-full bg-primary delay-300"></span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-800 p-4">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(input);
                }
              }}
              placeholder={isListening ? 'Listening...' : 'Ask or command your AI assistant...'}
              className="w-full rounded-full border border-slate-700 bg-background py-3 pl-5 pr-24 text-sm text-foreground placeholder-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={isLoading || isListening}
            />
            <div className="absolute inset-y-0 right-3 flex items-center gap-2">
              {isSupported && (
                <button
                  onClick={handleMicClick}
                  disabled={isLoading}
                  className={cn(
                    "rounded-full p-2 transition-colors",
                    isListening ? "bg-red-500/20 text-red-400 animate-pulse" : "text-muted hover:bg-slate-700 hover:text-foreground"
                  )}
                >
                  <Mic size={20} />
                </button>
              )}
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isLoading}
                className="rounded-full bg-primary p-2 text-white transition-opacity hover:bg-primary-hover disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Draft Cart Sidebar */}
      <div className="w-full lg:w-80 lg:pl-6 mt-6 lg:mt-0">
        <DraftCartPreview cart={draftCart} setCart={setDraftCart} />
      </div>
    </div>
  );
};

export default AiAssistantPage;
