import type { TranslationEntry, Language } from '../../types/translation';
import { translateText } from '../../services/translationService';

export async function updateTranslation(
  entry: TranslationEntry,
  sourceLang: Language,
  sourceValue: string,
  targetLang: Language
): Promise<TranslationEntry> {
  try {
    const translatedValue = await translateText(sourceValue, sourceLang, targetLang);
    
    return {
      ...entry,
      values: {
        ...entry.values,
        [targetLang]: translatedValue
      }
    };
  } catch (error) {
    console.error('Translation update failed:', error);
    return entry;
  }
}