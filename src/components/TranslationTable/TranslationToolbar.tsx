import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { LanguageSelector } from '../LanguageSelector';
import { ExportMenu } from '../ExportMenu';
import type { Language } from '../../types/translation';

interface TranslationToolbarProps {
  entryCount: number;
  onSearch: (term: string) => void;
  onLanguageChange: (lang: Language) => void;
  onExport: (lang: Language) => void;
  selectedLanguage: Language;
}

export function TranslationToolbar({
  entryCount,
  onSearch,
  onLanguageChange,
  onExport,
  selectedLanguage,
}: TranslationToolbarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Translation Editor</h2>
          <p className="text-gray-600 mt-1">{entryCount} translations loaded</p>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
          />
          <div className="relative">
            <input
              type="text"
              placeholder="Search translations..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            {searchTerm && (
              <button
                onClick={() => handleSearchChange('')}
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
  );
}