import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { MessageSquare, Code, Home, User } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Projects', path: '/projects', icon: Code },
  { name: 'AI Chat', path: '/chat', icon: MessageSquare },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
      <div className="backdrop-blur-md bg-slate-900/60 border border-slate-800/50 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl">
        <Link to="/" className="text-teal-400 font-bold text-xl tracking-tighter hover:scale-105 transition-transform">
          KA.
        </Link>
        
        <div className="flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative flex items-center gap-2 text-sm font-medium transition-colors hover:text-teal-400",
                  isActive ? "text-teal-400" : "text-slate-400"
                )}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
