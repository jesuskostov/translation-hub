import { useState } from 'react';
import type { Language } from '../types/translation';

interface TranslationProgress {
  isTranslating: boolean;
  progress: number;
  total: number;
  sourceLang: Language | null;
  targetLang: Language | null;
}

export function useTranslationProgress() {
  const [progress, setProgress] = useState<TranslationProgress>({
    isTranslating: false,
    progress: 0,
    total: 0,
    sourceLang: null,
    targetLang: null,
  });

  const startTranslation = (total: number, sourceLang: Language, targetLang: Language) => {
    setProgress({
      isTranslating: true,
      progress: 0,
      total,
      sourceLang,
      targetLang,
    });
  };

  const incrementProgress = () => {
    setProgress(prev => ({
      ...prev,
      progress: Math.min(prev.progress + 1, prev.total),
    }));
  };

  const finishTranslation = () => {
    setProgress({
      isTranslating: false,
      progress: 0,
      total: 0,
      sourceLang: null,
      targetLang: null,
    });
  };

  return {
    progress,
    startTranslation,
    incrementProgress,
    finishTranslation,
  };
}