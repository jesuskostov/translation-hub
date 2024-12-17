import type { TranslationEntry, Language } from '../../types/translation';
import { translateText } from '../../services/translationService';

interface TranslationOptions {
  onProgress?: () => void;
}

export async function processJsonInput(
  jsonInput: string,
  sourceLang: Language,
  options: TranslationOptions = {}
): Promise<TranslationEntry[]> {
  const json = JSON.parse(jsonInput);
  const entries: TranslationEntry[] = [];

  // Process each entry and translate to other languages
  for (const [key, value] of Object.entries(json)) {
    const values = { en: '', it: '', fr: '', [sourceLang]: String(value) };
    
    // Translate to other languages
    const targetLangs = ['en', 'it', 'fr'].filter(lang => lang !== sourceLang) as Language[];
    
    try {
      const translations = await Promise.all(
        targetLangs.map(async targetLang => {
          const result = await translateText(String(value), sourceLang, targetLang);
          options.onProgress?.();
          return result;
        })
      );

      targetLangs.forEach((lang, index) => {
        values[lang] = translations[index];
      });
    } catch (error) {
      console.error('Translation failed for key:', key, error);
    }

    entries.push({ key, values });
  }

  return entries;
}