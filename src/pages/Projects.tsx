import { motion } from 'motion/react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/resume';

export default function Projects() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-block px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-teal-400 text-xs font-bold uppercase tracking-widest mb-6"
        >
          Selected Works
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tighter text-slate-100 mb-6"
        >
          FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500">PROJECTS</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg max-w-2xl leading-relaxed"
        >
          A collection of high-end digital products, AI experiments, and open-source contributions. Each project represents a unique challenge and a commitment to quality.
        </motion.p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            index={idx}
            title={project.title}
            description={project.description}
            tags={project.tags}
            github={project.github}
            image={project.image}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-32 p-12 rounded-[40px] bg-gradient-to-br from-teal-500/10 to-indigo-500/10 border border-slate-800/50 text-center"
      >
        <h2 className="text-3xl font-black tracking-tighter text-slate-100 mb-4">Have a project in mind?</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <a
          href="mailto:alex.rivera@example.com"
          className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 text-white font-bold rounded-2xl hover:bg-teal-400 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-teal-500/20"
        >
          Get in Touch
        </a>
      </motion.div>
    </div>
  );
}
