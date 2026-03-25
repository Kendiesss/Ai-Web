import { motion } from 'motion/react';
import ChatInterface from '../components/ChatInterface';
import { Sparkles } from 'lucide-react';

export default function Chat() {
  return (
    <div className="pt-32 pb-20 px-6 h-screen flex flex-col max-w-7xl mx-auto">
      <header className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-teal-400 text-xs font-bold uppercase tracking-widest mb-6"
        >
          <Sparkles size={14} />
          <span>Powered by Gemini AI</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tighter text-slate-100 mb-4"
        >
          INTERACTIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500">RESUME</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed"
        >
          Ask my AI assistant anything about my skills, projects, or work history. It's trained on my full professional profile.
        </motion.p>
      </header>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex-1 min-h-0"
      >
        <ChatInterface />
      </motion.div>
    </div>
  );
}
