import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-800/50 bg-slate-950">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <div className="text-teal-400 font-bold text-2xl tracking-tighter mb-2">KA.</div>
          <p className="text-slate-500 text-sm max-w-xs">
            Senior Full-stack Developer specializing in Next.js and AI Integration.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
            <Github size={20} />
          </a>
          <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
            <Mail size={20} />
          </a>
        </div>

        <div className="text-slate-500 text-xs font-medium uppercase tracking-widest">
          © 2026 Ken Angeles. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
