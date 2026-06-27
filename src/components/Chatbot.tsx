import { useState, useRef, useEffect, FormEvent } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm Vansh's AI assistant. Ask me anything about his skills, education (like 12th score), projects, or contact details!\n\nNamaste! Main Vansh ka AI assistant hoon. Aap mujhse unke baare mein kuch bhi puch sakte hain!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "12th me kitna score tha?",
    "Vansh ka phone number?",
    "Show Skills",
    "Contact Vansh"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: FormEvent, text?: string) => {
    e?.preventDefault();
    const userMsg = text || input.trim();
    if (!userMsg || isLoading) return;

    const newMessages = [...messages, { id: Date.now(), text: userMsg, sender: 'user' as const }];
    setMessages(newMessages);
    if (!text) setInput('');
    setIsLoading(true);

    const loadingId = Date.now() + 1;
    setMessages(prev => [...prev, { id: loadingId, text: "Thinking...", sender: 'bot' }]);

    const getFallbackResponse = (userMsg: string) => {
      const lowerInput = userMsg.toLowerCase();
      // English Logic
      if (lowerInput.includes('who is') || lowerInput.includes('about vansh') || lowerInput.includes('who are you')) {
        return "Vansh Kashyap is the creator of Tech by Vansh. He specializes in Graphic Design, Video Editing, Web Development, and Tech troubleshooting.";
      } else if (lowerInput.includes('skill') || lowerInput.includes('what can you do')) {
        return "Vansh's skills include: Graphic Design, Video Editing, Web Development (HTML, CSS, JavaScript), AI tools, SEO, Tech troubleshooting, and Low-end PC gaming solutions.";
      } else if (lowerInput.includes('project') || lowerInput.includes('portfolio')) {
        window.location.hash = '#apps';
        return "Taking you to the Projects section!";
      } else if (lowerInput.includes('vanshlink')) {
        return "VanshLink: Connect instantly, chat privately. Your conversations, your control. You can check it out here: https://vanshlink.vercel.app/";
      } else if (lowerInput.includes('vthumb')) {
        return "vthumb: Youtube thumbnail Downloads. You can check it out here: https://vthumb.vercel.app/";
      } else if (lowerInput.includes('aura shakti') || lowerInput.includes('aurashakti')) {
        return "Aura Shakti: Find your aura. You can check it out here: https://aurashakti.vercel.app/";
      } else if (lowerInput.includes('app')) {
        return "Vansh has built apps like VanshLink (a chat app), vthumb (a YouTube thumbnail downloader), and Aura Shakti. You can find them in the Projects section!";
      } else if (lowerInput.includes('contact') || lowerInput.includes('hire') || lowerInput.includes('email')) {
        window.location.hash = '#contact';
        return "Taking you to the Contact section!";
      } else if (lowerInput.includes('about')) {
        window.location.hash = '#about';
        return "Taking you to the About section!";
      } else if (lowerInput.includes('12th') || lowerInput.includes('score') || lowerInput.includes('education')) {
        return "Vansh scored 72.8% in 12th Standard (2024) and 73.8% in 10th Standard (2022). He also completed ITI with 85%!";
      } else if (lowerInput.includes('phone') || lowerInput.includes('whatsapp') || lowerInput.includes('number')) {
        return "You can contact Vansh on WhatsApp at +91 8800628376.";
      }
      // Hinglish Logic
      else if (lowerInput.includes('kon hai') || lowerInput.includes('kaun hai') || lowerInput.includes('kya karta')) {
        return "Main Vansh Kashyap ka AI assistant hoon! Vansh ek Tech Creator hai jo Graphic Design, Video Editing, aur Web Development mein expert hai.";
      } else if (lowerInput.includes('kya aata') || lowerInput.includes('skills batao') || lowerInput.includes('kya skill')) {
        return "Vansh ko Graphic Design, Video Editing, Web Development, AI tools, SEO, aur Tech troubleshooting aati hai.";
      } else if (lowerInput.includes('kaam dikhao') || lowerInput.includes('project dikhao')) {
        window.location.hash = '#apps';
        return "Zaroor! Main aapko Projects section par le chalta hoon.";
      } else if (lowerInput.includes('baat karni') || lowerInput.includes('contact karna') || lowerInput.includes('kaise milu')) {
        window.location.hash = '#contact';
        return "Bilkul! Main aapko Contact section par le chalta hoon jahan aap Vansh se connect kar sakte hain.";
      }
      return "I'm currently in basic mode. You can ask about Vansh's skills, projects, contact, or education! / Main abhi basic mode mein hoon, aap Vansh ke skills ya projects ke baare mein puch sakte hain.";
    };

    // Build chat history for the server (OpenAI/Groq format)
    const history = messages
      .filter((m) => m.text && m.text !== 'Thinking...')
      .map((m) => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }));
    while (history.length && history[0].role === 'assistant') history.shift();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history }),
      });

      if (!res.ok) throw new Error(`Chat API returned ${res.status}`);

      const data = await res.json();
      let botResponse: string = data.text || '';

      // Handle function calls for navigation
      if (data.functionCall && data.functionCall.name === 'navigateToSection') {
        const args = (data.functionCall.args || {}) as Record<string, unknown>;
        let section = String(args.section || '').toLowerCase();

        // Normalise to real section ids on the page
        const aliases: Record<string, string> = { projects: 'apps', project: 'apps', work: 'apps', tools: 'ai-tools' };
        if (aliases[section]) section = aliases[section];
        const validIds = ['about', 'ai-tools', 'apps', 'services', 'stack', 'graphics', 'automation', 'platforms', 'skills', 'experience', 'education', 'youtube', 'contact'];

        if (section === 'home') {
          window.location.hash = '#/';
          window.scrollTo({ top: 0, behavior: 'smooth' });
          botResponse = 'Taking you to the home section!';
        } else if (validIds.includes(section)) {
          window.location.hash = `#${section}`;
          botResponse = `Taking you to the ${section} section!`;
        }
        // unknown section => no navigation, keep the model's text reply
      }

      if (!botResponse) {
        botResponse = getFallbackResponse(userMsg);
      }

      setMessages(prev => prev.map(msg =>
        msg.id === loadingId ? { ...msg, text: botResponse } : msg
      ));
    } catch (error) {
      console.warn("AI Chatbot failed, using fallback:", error);
      const fallbackMsg = getFallbackResponse(userMsg);
      setMessages(prev => prev.map(msg => 
        msg.id === loadingId ? { ...msg, text: fallbackMsg } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[60] p-4 bg-neon-green text-zinc-950 rounded-full shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open Chatbot"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[60] w-[calc(100vw-3rem)] sm:w-80 h-[450px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
                <h3 className="font-display font-bold text-zinc-100">Tech by Vansh AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-neon-green text-zinc-950 rounded-tr-sm'
                        : 'bg-zinc-800 text-zinc-100 rounded-tl-sm'
                    } ${msg.text === 'Thinking...' ? 'animate-pulse text-zinc-400' : ''}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Initial Suggestions */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(undefined, suggestion)}
                      disabled={isLoading}
                      className="text-xs bg-zinc-950 hover:bg-neon-green hover:text-zinc-950 text-zinc-300 px-3 py-1.5 rounded-full transition-colors border border-zinc-800 hover:border-neon-green text-left disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={(e) => handleSend(e)} className="p-3 border-t border-zinc-800 bg-zinc-950 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Ask me something..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-green transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 bg-neon-green text-zinc-950 rounded-xl hover:bg-neon-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
