import React, { useState } from 'react';
import { Trash2, Languages, Loader2 } from 'lucide-react';
import type { TranslationEntry, Language } from '../../types/translation';

interface TranslationContentProps {
  entries: TranslationEntry[];
  searchTerm: string;
  onEntryUpdate: (key: string, language: Language, newValue: string, shouldTranslate?: boolean) => void;
  onDeleteKey: (key: string) => void;
}

export function TranslationContent({
  entries,
  searchTerm,
  onEntryUpdate,
  onDeleteKey,
}: TranslationContentProps) {
  const [translatingCell, setTranslatingCell] = useState<{ key: string; lang: Language } | null>(null);
  
  const filteredEntries = entries.filter(entry =>
    entry.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Object.values(entry.values).some(value =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleTranslate = async (entry: TranslationEntry, targetLang: Language) => {
    setTranslatingCell({ key: entry.key, lang: targetLang });
    await onEntryUpdate(entry.key, targetLang, '', true);
    setTranslatingCell(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Translation Key
              </th>
              {(['en', 'it', 'fr'] as Language[]).map(lang => (
                <th key={lang} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {lang.toUpperCase()}
                </th>
              ))}
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredEntries.map(entry => (
              <tr key={entry.key} className="hover:bg-blue-50 transition-colors">
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
                {(['en', 'it', 'fr'] as Language[]).map(lang => (
                  <td key={lang} className="px-6 py-4">
                    <div className="relative group">
                      <textarea
                        value={entry.values[lang] || ''}
                        onChange={(e) => onEntryUpdate(entry.key, lang, e.target.value)}
                        className="w-full px-3 py-1.5 rounded transition-all resize-none min-h-[60px]
                                 border border-transparent hover:border-gray-300 focus:border-blue-500
                                 focus:ring-2 focus:ring-blue-200"
                        placeholder={`Enter ${lang.toUpperCase()} translation...`}
                      />
                      {lang !== 'en' && entry.values.en && (
                        translatingCell?.key === entry.key && translatingCell?.lang === lang ? (
                          <div className="absolute right-2 top-2 p-1.5">
                            <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                          </div>
                        ) : (
                          <button
                            onClick={() => handleTranslate(entry, lang)}
                            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100
                                     transition-opacity p-1.5 bg-blue-50 text-blue-600 rounded-md
                                     hover:bg-blue-100"
                            title={`Translate from English to ${lang.toUpperCase()}`}
                          >
                            <Languages className="w-4 h-4" />
                          </button>
                        )
                      )}
                    </div>
                  </td>
                ))}
                <td className="px-6 py-4">
                  <button
                    onClick={() => onDeleteKey(entry.key)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg
                             hover:bg-red-50"
                    title="Delete translation key"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}