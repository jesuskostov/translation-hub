import React from 'react';
import { Plus, Download } from 'lucide-react';
import { ExportMenu } from '../ExportMenu';
import type { Language } from '../../types/translation';

interface TranslationActionsProps {
  onExport: (language: Language) => void;
}

export function TranslationActions({ onExport }: TranslationActionsProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-gray-200">
      <h3 className="text-sm font-medium text-gray-900">Actions</h3>
      <div className="space-y-2">
        <button
          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 rounded-lg
                   flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Translation Key</span>
        </button>
        <ExportMenu onExport={onExport} />
      </div>
    </div>
  );
}