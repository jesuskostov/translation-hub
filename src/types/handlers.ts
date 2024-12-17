import type { Language, TranslationEntry } from './translation';

export interface TranslationHandlers {
  createProject: (name: string) => void;
  setActiveProject: (id: string) => void;
  deleteProject: (id: string) => void;
  handleJsonSubmit: (jsonInput: string, language: Language) => Promise<void>;
  handleEntryUpdate: (key: string, language: Language, newValue: string, shouldTranslate?: boolean) => Promise<void>;
  handleAddKey: (entry: TranslationEntry) => void;
  handleDeleteKey: (key: string) => void;
  handleExport: (language: Language) => void;
}