import type { TranslationEntry, Language } from '../types/translation';

export const exportTranslations = (entries: TranslationEntry[], language: Language) => {
  const exportObject = entries.reduce(
    (acc, { key, values }) => ({ ...acc, [key]: values[language] }),
    {}
  );
  
  const jsonString = JSON.stringify(exportObject, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `translations_${language}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};