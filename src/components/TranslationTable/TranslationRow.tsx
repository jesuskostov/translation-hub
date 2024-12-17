import React from 'react';
import type { TranslationEntry, Language } from '../../types/translation';

interface TranslationRowProps {
  entry: TranslationEntry;
  onEntryUpdate: (key: string, language: Language, newValue: string) => void;
}

export function TranslationRow({ entry, onEntryUpdate }: TranslationRowProps) {
  // Early return if entry is invalid
  if (!entry?.key || !entry?.values) {
    return null;
  }

  const handleUpdate = (lang: Language, value: string) => {
    try {
      onEntryUpdate(entry.key, lang, value);
    } catch (error) {
      console.error(`Failed to update translation for ${entry.key}:`, error);
    }
  };

  return (
    <tr className="hover:bg-blue-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {entry.key.split('.').pop()}
          </span>
          <span className="text-xs text-gray-500">
            {entry.key}
          </span>
        </div>
      </td>
      {(['en', 'it', 'fr'] as Language[]).map((lang) => (
        <td key={lang} className="px-6 py-4">
          <div className="relative">
            <textarea
              value={entry.values[lang] || ''}
              onChange={(e) => handleUpdate(lang, e.target.value)}
              className="w-full px-3 py-1.5 rounded transition-all resize-none min-h-[60px]
                       border border-transparent hover:border-gray-300 focus:border-blue-500
                       focus:ring-2 focus:ring-blue-200"
              placeholder={`Enter ${lang.toUpperCase()} translation...`}
            />
          </div>
        </td>
      ))}
    </tr>
  );
}