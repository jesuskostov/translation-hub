import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Language, TranslationEntry } from '../../types/translation';

interface AddKeyModalProps {
  onClose: () => void;
  onAdd: (entry: TranslationEntry) => void;
}

export function AddKeyModal({ onClose, onAdd }: AddKeyModalProps) {
  const [key, setKey] = useState('');
  const [values, setValues] = useState<Record<Language, string>>({
    en: '',
    fr: '',
    it: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) return;

    onAdd({
      key: key.trim(),
      values,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add Translation Key</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="key" className="block text-sm font-medium text-gray-700">
              Translation Key
            </label>
            <input
              type="text"
              id="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                       focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., common.buttons.submit"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {(['en', 'fr', 'it'] as Language[]).map((lang) => (
              <div key={lang}>
                <label className="block text-sm font-medium text-gray-700">
                  {lang.toUpperCase()}
                </label>
                <textarea
                  value={values[lang]}
                  onChange={(e) => setValues(prev => ({
                    ...prev,
                    [lang]: e.target.value
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                           focus:border-blue-500 focus:ring-blue-500 resize-none h-24"
                  placeholder={`Enter ${lang.toUpperCase()} translation...`}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border
                       border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!key.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600
                       rounded-md hover:bg-blue-700 disabled:opacity-50
                       disabled:cursor-not-allowed"
            >
              Add Translation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}