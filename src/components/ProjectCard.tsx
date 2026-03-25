import { motion } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  github: string;
  image: string;
  index: number;
  key?: any;
}

export default function ProjectCard({ title, description, tags, github, image, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/40 backdrop-blur-sm transition-all hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-teal-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-teal-400 bg-teal-400/10 rounded-md border border-teal-400/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-teal-400 transition-colors"
          >
            <Github size={18} />
            <span>Code</span>
          </a>
          <button className="flex items-center gap-2 text-sm text-slate-300 hover:text-teal-400 transition-colors">
            <ExternalLink size={18} />
            <span>Demo</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
