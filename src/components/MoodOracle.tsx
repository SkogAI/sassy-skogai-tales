import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, X } from 'lucide-react';
import { type MoodData, getMoodConfig } from '@/hooks/useMoodOracle';

interface MoodOracleProps {
  moodData: MoodData | null;
  loading: boolean;
}

// Floating mood particles
const MoodParticles = ({ moodData }: { moodData: MoodData }) => {
  const config = getMoodConfig(moodData.mood);
  const particleCount = Math.floor(15 + moodData.intensity * 25);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {Array.from({ length: particleCount }).map((_, i) => {
        const x = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 6 + Math.random() * 10;
        const size = 2 + Math.random() * (moodData.mood === 'chaotic' ? 8 : 4);
        const drift = moodData.mood === 'chaotic' ? (Math.random() - 0.5) * 200 : (Math.random() - 0.5) * 60;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              bottom: '-10px',
              background: config.particleColor,
              boxShadow: `0 0 ${size * 2}px ${config.particleColor}`,
            }}
            animate={{
              y: [0, -window.innerHeight - 50],
              x: [0, drift],
              opacity: [0, 0.8 * moodData.intensity, 0],
              scale: moodData.mood === 'whimsical' ? [1, 1.5, 0.5, 1] : [1, 1, 0.5],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: moodData.mood === 'chaotic' ? 'easeInOut' : 'linear',
            }}
          />
        );
      })}
    </div>
  );
};

// Reactive crown that responds to mood
const ReactiveCrown = ({ moodData }: { moodData: MoodData }) => {
  const config = getMoodConfig(moodData.mood);

  const crownAnimations = {
    triumphant: { rotate: [0, -5, 5, 0], scale: [1, 1.15, 1] },
    dramatic: { rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.2, 0.95, 1.1, 1] },
    mysterious: { rotate: [0, 2, -2, 0], scale: [1, 1.02, 0.98, 1] },
    peaceful: { rotate: [0, 1, -1, 0], scale: [1, 1.03, 1] },
    chaotic: { rotate: [0, -15, 20, -10, 15, -5, 0], scale: [1, 1.3, 0.8, 1.2, 0.9, 1.1, 1] },
    melancholic: { rotate: [0, -3, 0], scale: [1, 0.95, 1] },
    whimsical: { rotate: [0, -8, 8, -4, 4, 0], scale: [1, 1.1, 1.05, 1.15, 1] },
  };

  return (
    <motion.div
      className="relative"
      animate={crownAnimations[moodData.mood]}
      transition={{
        duration: moodData.mood === 'chaotic' ? 1.5 : 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Crown className="w-6 h-6" style={{ color: config.particleColor }} />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: `0 0 20px ${config.particleColor}` }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

// Mood ring indicator
const MoodRing = ({ moodData }: { moodData: MoodData }) => {
  const config = getMoodConfig(moodData.mood);

  return (
    <div className="relative w-10 h-10">
      {/* Outer ring glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(${config.ringColors.join(', ')}, ${config.ringColors[0]})`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: moodData.mood === 'chaotic' ? 2 : 8, repeat: Infinity, ease: 'linear' }}
      />
      {/* Inner ring */}
      <div
        className="absolute inset-[3px] rounded-full flex items-center justify-center text-sm"
        style={{ background: `hsl(${moodData.color_hue} 30% 10%)` }}
      >
        {config.emoji}
      </div>
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-[-4px] rounded-full border-2"
        style={{ borderColor: config.particleColor }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

const MoodOracle = ({ moodData, loading }: MoodOracleProps) => {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || (!moodData && !loading)) return null;

  return (
    <>
      {/* Mood particles overlay */}
      {moodData && <MoodParticles moodData={moodData} />}

      {/* Floating mood ring widget */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 1, stiffness: 200 }}
      >
        {/* Loading state */}
        {loading && !moodData && (
          <motion.div
            className="w-12 h-12 rounded-full border-2 border-primary/40 flex items-center justify-center bg-background/80 backdrop-blur-sm cursor-pointer"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Crown className="w-5 h-5 text-primary animate-pulse" />
          </motion.div>
        )}

        {/* Mood display */}
        {moodData && (
          <div className="flex flex-col items-end gap-3">
            {/* Expanded panel */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  className="rounded-xl p-4 backdrop-blur-md border shadow-2xl max-w-[280px]"
                  style={{
                    background: `linear-gradient(135deg, hsl(${moodData.color_hue} 30% 10% / 0.95), hsl(${moodData.color_hue} 25% 15% / 0.9))`,
                    borderColor: `hsl(${moodData.color_hue} 40% 40% / 0.4)`,
                    boxShadow: `0 20px 60px hsl(${moodData.color_hue} 50% 30% / 0.3)`,
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <ReactiveCrown moodData={moodData} />
                      <span
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: `hsl(${moodData.color_hue} 60% 70%)` }}
                      >
                        Royal Mood Oracle
                      </span>
                    </div>
                    <button
                      onClick={() => setDismissed(true)}
                      className="text-white/40 hover:text-white/80 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getMoodConfig(moodData.mood).emoji}</span>
                    <span
                      className="font-serif text-lg font-bold"
                      style={{ color: `hsl(${moodData.color_hue} 50% 80%)` }}
                    >
                      {getMoodConfig(moodData.mood).label}
                    </span>
                  </div>

                  <p
                    className="text-xs italic leading-relaxed mb-3"
                    style={{ color: `hsl(${moodData.color_hue} 30% 70%)` }}
                  >
                    "{moodData.description}"
                  </p>

                  {/* Intensity bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]" style={{ color: `hsl(${moodData.color_hue} 30% 60%)` }}>
                      <span>Intensity</span>
                      <span>{Math.round(moodData.intensity * 100)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `hsl(${moodData.color_hue} 20% 20%)` }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${getMoodConfig(moodData.mood).ringColors.join(', ')})`,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${moodData.intensity * 100}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Clickable mood ring */}
            <motion.button
              onClick={() => setExpanded(!expanded)}
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MoodRing moodData={moodData} />
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Full-page ambient glow */}
      {moodData && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Top glow */}
          <div
            className="absolute top-0 left-0 right-0 h-64"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, hsl(${moodData.color_hue} 50% 50% / ${0.06 * moodData.intensity}), transparent 70%)`,
            }}
          />
          {/* Corner accents */}
          <div
            className="absolute bottom-0 right-0 w-96 h-96"
            style={{
              background: `radial-gradient(circle at 100% 100%, hsl(${moodData.color_hue} 60% 40% / ${0.04 * moodData.intensity}), transparent 60%)`,
            }}
          />
        </motion.div>
      )}
    </>
  );
};

export default MoodOracle;
