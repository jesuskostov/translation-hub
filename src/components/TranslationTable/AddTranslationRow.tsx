import React, { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';
import type { Language, TranslationEntry } from '../../types/translation';

interface AddTranslationRowProps {
  onAdd: (entry: TranslationEntry) => void;
}

export function AddTranslationRow({ onAdd }: AddTranslationRowProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [key, setKey] = useState('');
  const [values, setValues] = useState<Record<Language, string>>({
    en: '',
    fr: '',
    it: '',
  });

  const handleSubmit = () => {
    if (!key.trim()) return;

    onAdd({
      key: key.trim(),
      values,
    });

    // Reset form
    setKey('');
    setValues({ en: '', fr: '', it: '' });
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <tr className="border-t border-gray-100">
        <td colSpan={4}>
          <button
            onClick={() => setIsAdding(true)}
            className="w-full px-6 py-4 text-left text-sm text-blue-600 hover:bg-blue-50 
                     transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Translation Key</span>
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-t border-gray-100 bg-blue-50">
      <td className="px-6 py-4">
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter translation key..."
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500"
          autoFocus
        />
      </td>
      {(['en', 'it', 'fr'] as Language[]).map((lang) => (
        <td key={lang} className="px-6 py-4">
          <textarea
            value={values[lang]}
            onChange={(e) => setValues(prev => ({
              ...prev,
              [lang]: e.target.value
            }))}
            placeholder={`Enter ${lang.toUpperCase()} translation...`}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 resize-none min-h-[60px]"
          />
        </td>
      ))}
      <td className="px-6 py-4 absolute right-0">
        <div className="flex space-x-2">
          <button
            onClick={handleSubmit}
            disabled={!key.trim()}
            className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}