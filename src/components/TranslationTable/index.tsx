import React, { useState } from 'react';
import type { TranslationEntry, Language } from '../../types/translation';
import { TranslationToolbar } from './TranslationToolbar';
import { TranslationContent } from './TranslationContent';
import { AddKeyModal } from './AddKeyModal';
import { ErrorBoundary } from '../ErrorBoundary';

interface TranslationTableProps {
  entries: TranslationEntry[];
  onEntryUpdate: (key: string, language: Language, newValue: string) => void;
  onAddKey: (entry: TranslationEntry) => void;
  onDeleteKey: (key: string) => void;
  onExport: (language: Language) => void;
}

export function TranslationTable({
  entries = [],
  onEntryUpdate,
  onAddKey,
  onDeleteKey,
  onExport,
}: TranslationTableProps) {
  const [isAddingKey, setIsAddingKey] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <TranslationToolbar
          entryCount={entries.length}
          onSearch={setSearchTerm}
          onLanguageChange={setSelectedLanguage}
          onExport={onExport}
          selectedLanguage={selectedLanguage}
          onAddKey={() => setIsAddingKey(true)}
        />

        <TranslationContent
          entries={entries}
          searchTerm={searchTerm}
          onEntryUpdate={onEntryUpdate}
          onDeleteKey={onDeleteKey}
        />

        {isAddingKey && (
          <AddKeyModal
            onClose={() => setIsAddingKey(false)}
            onAdd={onAddKey}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}