import type { Language } from '../types/translation';

interface TranslationResponse {
  translatedText: string;
}

export async function translateText(text: string, sourceLang: Language, targetLang: Language): Promise<string> {
  try {
    const response = await fetch(`https://translate.g-home.site/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      })
    });

    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`);
    }

    const data = await response.json() as TranslationResponse;
    return data.translatedText || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text on error
  }
}