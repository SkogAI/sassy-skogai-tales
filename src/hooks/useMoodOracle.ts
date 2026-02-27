import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MoodData {
  mood: 'triumphant' | 'dramatic' | 'mysterious' | 'peaceful' | 'chaotic' | 'melancholic' | 'whimsical';
  intensity: number;
  description: string;
  color_hue: number;
}

const MOOD_CONFIGS = {
  triumphant: { emoji: '👑', label: 'Triumphant', particleColor: 'hsl(45 90% 60%)', ringColors: ['hsl(45 90% 60%)', 'hsl(35 85% 55%)', 'hsl(25 80% 50%)'] },
  dramatic: { emoji: '⚡', label: 'Dramatic', particleColor: 'hsl(0 75% 55%)', ringColors: ['hsl(0 75% 55%)', 'hsl(345 70% 50%)', 'hsl(15 80% 45%)'] },
  mysterious: { emoji: '🌙', label: 'Mysterious', particleColor: 'hsl(270 60% 60%)', ringColors: ['hsl(270 60% 60%)', 'hsl(280 50% 50%)', 'hsl(260 55% 45%)'] },
  peaceful: { emoji: '🌿', label: 'Peaceful', particleColor: 'hsl(160 50% 55%)', ringColors: ['hsl(160 50% 55%)', 'hsl(180 45% 60%)', 'hsl(140 40% 50%)'] },
  chaotic: { emoji: '🎪', label: 'Chaotic', particleColor: 'hsl(300 80% 60%)', ringColors: ['hsl(300 80% 60%)', 'hsl(60 90% 55%)', 'hsl(180 80% 50%)'] },
  melancholic: { emoji: '🥀', label: 'Melancholic', particleColor: 'hsl(220 40% 50%)', ringColors: ['hsl(220 40% 50%)', 'hsl(240 35% 45%)', 'hsl(200 30% 55%)'] },
  whimsical: { emoji: '✨', label: 'Whimsical', particleColor: 'hsl(320 60% 65%)', ringColors: ['hsl(320 60% 65%)', 'hsl(280 55% 60%)', 'hsl(340 50% 70%)'] },
};

export const getMoodConfig = (mood: MoodData['mood']) => MOOD_CONFIGS[mood];

export const useMoodOracle = (postContent?: string, postTitle?: string) => {
  const [moodData, setMoodData] = useState<MoodData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postContent || !postTitle) return;

    const cacheKey = `mood-oracle-${postTitle.slice(0, 50)}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        setMoodData(JSON.parse(cached));
        return;
      } catch { /* ignore */ }
    }

    const analyzeMood = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fnError } = await supabase.functions.invoke('analyze-mood', {
          body: { content: postContent, title: postTitle },
        });

        if (fnError) throw fnError;
        if (data?.error) throw new Error(data.error);

        setMoodData(data as MoodData);
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      } catch (err) {
        console.error('Mood Oracle error:', err);
        setError(err instanceof Error ? err.message : 'Failed to divine mood');
        // Fallback mood
        setMoodData({ mood: 'mysterious', intensity: 0.5, description: 'The Oracle ponders in silence...', color_hue: 270 });
      } finally {
        setLoading(false);
      }
    };

    analyzeMood();
  }, [postContent, postTitle]);

  return { moodData, loading, error };
};
