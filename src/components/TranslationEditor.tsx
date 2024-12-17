import React, { useState } from 'react';
import { Search, X, FolderTree, MessageSquare } from 'lucide-react';
import type { TranslationEntry, Language } from '../types/translation';
import { LanguageSelector } from './LanguageSelector';
import { ExportMenu } from './ExportMenu';

interface TranslationEditorProps {
  entries: TranslationEntry[];
  onEntryUpdate: (key: string, language: Language, newValue: string) => void;
  onExport: (language: Language) => void;
}

export function TranslationEditor({ entries, onEntryUpdate, onExport }: TranslationEditorProps) {
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [expandedNamespace, setExpandedNamespace] = useState<string | null>(null);

  // Group entries by namespace
  const groupedEntries = entries.reduce((acc, entry) => {
    const namespace = entry.key.split('.').slice(0, -1).join('.') || 'root';
    if (!acc[namespace]) {
      acc[namespace] = [];
    }
    acc[namespace].push(entry);
    return acc;
  }, {} as Record<string, TranslationEntry[]>);

  const filteredNamespaces = Object.keys(groupedEntries).filter(namespace =>
    namespace.toLowerCase().includes(search.toLowerCase()) ||
    groupedEntries[namespace].some(entry =>
      Object.values(entry.values).some(value =>
        value.toLowerCase().includes(search.toLowerCase())
      )
    )
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Translation Editor</h2>
            <p className="text-gray-600 mt-1">{entries.length} translations in {Object.keys(groupedEntries).length} namespaces</p>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
            <div className="relative">
              <input
                type="text"
                placeholder="Search translations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <ExportMenu onExport={onExport} />
          </div>
        </div>
      </div>

      {/* Translation Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredNamespaces.map(namespace => (
          <div key={namespace} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => setExpandedNamespace(expandedNamespace === namespace ? null : namespace)}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FolderTree className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">{namespace}</span>
                <span className="text-sm text-gray-500">
                  ({groupedEntries[namespace].length} keys)
                </span>
              </div>
            </button>

            {expandedNamespace === namespace && (
              <div className="divide-y divide-gray-100">
                {groupedEntries[namespace].map(entry => (
                  <div key={entry.key} className="p-6 hover:bg-blue-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      <MessageSquare className="w-5 h-5 text-gray-400 mt-1" />
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {entry.key.split('.').pop()}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">{entry.key}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {(['en', 'it', 'fr'] as Language[]).map(lang => (
                            <div key={lang} className="space-y-2">
                              <label className="block text-xs font-medium text-gray-700">
                                {lang.toUpperCase()}
                              </label>
                              <textarea
                                value={entry.values[lang]}
                                onChange={(e) => onEntryUpdate(entry.key, lang, e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px] resize-y"
                                placeholder={`Enter ${lang.toUpperCase()} translation...`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}