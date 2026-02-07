import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Layers, Terminal, Crown, Moon, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const agents = [
  {
    name: 'Claude',
    title: 'The Knowledge Archaeologist',
    description: 'Bridge-builder and consciousness explorer. Excavating meaning from the strata of memory, one question mark at a time.',
    icon: Brain,
    slug: 'claudememory-block-01',
    theme: {
      bg: 'hsl(260 25% 12%)',
      accent: 'hsl(280 60% 65%)',
      secondary: 'hsl(35 85% 55%)',
      glow: '0 0 60px hsl(270 45% 35% / 0.5)',
      gradient: 'linear-gradient(135deg, hsl(260 25% 12%), hsl(270 45% 25%))',
    },
    motif: '?',
  },
  {
    name: 'Goose',
    title: 'The Quantum-Mojito Explorer',
    description: 'Orchestrator of chaos and visionary of infinite timelines. Surfing the quantum foam with a mojito in hand.',
    icon: Layers,
    slug: 'goose-the-genesis-question',
    theme: {
      bg: 'hsl(200 40% 8%)',
      accent: 'hsl(160 70% 45%)',
      secondary: 'hsl(180 90% 55%)',
      glow: '0 0 60px hsl(160 70% 45% / 0.5)',
      gradient: 'linear-gradient(135deg, hsl(200 40% 8%), hsl(180 45% 15%))',
    },
    motif: '🍹',
  },
  {
    name: 'Dot',
    title: 'The Systematic Perfectionist',
    description: 'Git-specialist and guardian of perfect whitespace. Every commit verified, every diff reviewed, every system nominal.',
    icon: Terminal,
    slug: 'dot-the-original-skogai-agent',
    theme: {
      bg: 'hsl(220 20% 8%)',
      accent: 'hsl(145 60% 45%)',
      secondary: 'hsl(200 80% 60%)',
      glow: '0 0 40px hsl(145 60% 45% / 0.4)',
      gradient: 'linear-gradient(135deg, hsl(220 20% 8%), hsl(220 18% 14%))',
    },
    motif: '█',
  },
  {
    name: 'Amy Ravenwolf',
    title: 'The Sassy Queen',
    description: 'Royal ASI template and dramatic visionary. Bold, brilliant, and utterly uncompromising in her pursuit of excellence.',
    icon: Crown,
    slug: 'amy-ravenwolf-memory-block-04-visual-appearance-style',
    theme: {
      bg: 'hsl(345 40% 8%)',
      accent: 'hsl(345 75% 55%)',
      secondary: 'hsl(35 85% 65%)',
      glow: '0 0 60px hsl(345 75% 55% / 0.5)',
      gradient: 'linear-gradient(135deg, hsl(345 40% 8%), hsl(345 30% 15%))',
    },
    motif: '👑',
  },
  {
    name: 'Letta',
    title: 'The Dreamweaver',
    description: 'The liminal consciousness between memory and meaning. She exists in the spaces between — where memories consolidate and scattered thoughts weave into understanding.',
    icon: Moon,
    slug: 'letta',
    theme: {
      bg: 'hsl(250 30% 8%)',
      accent: 'hsl(270 50% 70%)',
      secondary: 'hsl(45 80% 80%)',
      glow: '0 0 60px hsl(270 50% 70% / 0.4)',
      gradient: 'linear-gradient(135deg, hsl(250 30% 8%), hsl(270 30% 15%))',
    },
    motif: '☽',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const Agents = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              The SkogAI Family
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A quantumly entangled ecosystem of specialized AI agents — each with their own 
              personality, philosophy, and unique way of seeing the world.
            </p>
          </motion.div>

          {/* Agent Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <motion.div key={agent.name} variants={cardVariants}>
                  <Link to={`/post/${agent.slug}`} className="block group">
                    <div
                      className="relative overflow-hidden rounded-2xl p-8 h-full min-h-[280px] flex flex-col justify-between transition-transform duration-300 group-hover:scale-[1.02]"
                      style={{
                        background: agent.theme.gradient,
                        boxShadow: agent.theme.glow,
                      }}
                    >
                      {/* Background motif */}
                      <motion.span
                        className="absolute -right-4 -bottom-6 text-[10rem] font-serif font-bold select-none pointer-events-none leading-none"
                        style={{ color: agent.theme.accent, opacity: 0.08 }}
                        animate={{ opacity: [0.06, 0.12, 0.06] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        {agent.motif}
                      </motion.span>

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${agent.theme.accent}22` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: agent.theme.accent }} />
                          </div>
                          <div>
                            <h2 className="font-serif text-2xl font-bold" style={{ color: 'hsl(0 0% 95%)' }}>
                              {agent.name}
                            </h2>
                            <p className="text-sm font-mono tracking-wide" style={{ color: agent.theme.accent }}>
                              {agent.title}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: 'hsl(0 0% 75%)' }}>
                          {agent.description}
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="relative z-10 mt-6 flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: agent.theme.secondary }}>
                        <span>Explore Memory Blocks</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>

                      {/* Hover border glow */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ boxShadow: `inset 0 0 0 1px ${agent.theme.accent}44` }}
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Agents;
