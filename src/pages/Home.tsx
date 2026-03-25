import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MessageSquare, Code, Cpu, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { resumeData } from '../data/resume';

const competencies = [
  {
    title: "Frontend Development",
    description: "Expertise in React, Next.js, and TypeScript. Building responsive, accessible, and performant user interfaces with Tailwind CSS and Framer Motion.",
    icon: Code,
    skills: resumeData.skills.frontend,
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    border: "border-teal-400/20"
  },
  {
    title: "Backend Architecture",
    description: "Designing scalable server-side systems with Node.js, Express, and both SQL/NoSQL databases. Focused on performance, security, and clean API design.",
    icon: Layers,
    skills: resumeData.skills.backend,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/20"
  },
  {
    title: "AI Integration",
    description: "Implementing state-of-the-art AI features using Gemini and OpenAI APIs. Building intelligent chatbots, automated workflows, and RAG systems.",
    icon: Cpu,
    skills: resumeData.skills.ai,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20"
  }
];

export default function Home() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative mb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-teal-400 text-xs font-bold uppercase tracking-widest mb-8"
        >
          <Sparkles size={14} />
          <span>Available for New Projects</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-100 mb-8 leading-[0.9]"
        >
          BUILDING THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500">FUTURE</span> OF THE WEB.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Hi, I'm <span className="text-slate-100 font-semibold">Ken Angeles</span>. A Senior Full-stack Developer passionate about creating high-end digital experiences and integrating intelligent AI solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/chat"
            className="group relative px-8 py-4 bg-teal-500 text-white font-bold rounded-2xl flex items-center gap-3 overflow-hidden shadow-2xl shadow-teal-500/20 hover:bg-teal-400 transition-all hover:scale-105 active:scale-95"
          >
            <MessageSquare size={20} />
            <span>Chat with my AI</span>
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
          </Link>
          
          <Link
            to="/projects"
            className="px-8 py-4 bg-slate-900 text-slate-100 font-bold rounded-2xl border border-slate-800 flex items-center gap-3 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
          >
            <span>View Projects</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full -z-10" />
      </section>

      {/* Core Competencies */}
      <section className="mb-32">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-black tracking-tighter text-slate-100 uppercase">Core Competencies</h2>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {competencies.map((comp, idx) => {
            const Icon = comp.icon;
            return (
              <motion.div
                key={comp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm hover:border-slate-700 transition-all"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", comp.bg, comp.color, comp.border)}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">{comp.title}</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                  {comp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {comp.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 text-[10px] font-bold text-slate-500 bg-slate-800/50 rounded-md uppercase tracking-wider">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Quick Stats / Info */}
      <section className="grid md:grid-cols-4 gap-8 p-12 rounded-[40px] bg-slate-900/20 border border-slate-800/50 backdrop-blur-sm">
        <div className="text-center md:text-left">
          <div className="text-4xl font-black text-teal-400 mb-1">8+</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Years Experience</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-4xl font-black text-indigo-400 mb-1">50+</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Projects Completed</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-4xl font-black text-emerald-400 mb-1">20+</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Happy Clients</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-4xl font-black text-teal-400 mb-1">100%</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Commitment</div>
        </div>
      </section>
    </div>
  );
}
