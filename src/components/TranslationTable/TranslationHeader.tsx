import React from 'react';
import { Languages } from 'lucide-react';
import type { Language } from '../../types/translation';

export function TranslationHeader() {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
          Translation Key
        </th>
        {(['en', 'it', 'fr'] as Language[]).map(lang => (
          <th key={lang} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="flex items-center space-x-2">
              <Languages className="w-4 h-4" />
              <span>{lang.toUpperCase()}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}