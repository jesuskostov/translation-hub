import { useState, useEffect } from 'react';
import { useProjects } from './useProjects';
import { useTranslationProgress } from './useTranslationProgress';
import { processJsonInput, updateTranslation } from '../utils/translationUtils';
import { exportTranslations } from '../utils/exportUtils';
import type { Language, TranslationEntry, TranslationState } from '../types/translation';
import type { TranslationHandlers } from '../types/handlers';

export function useTranslationManager() {
  const {
    projects,
    activeProjectId,
    createProject,
    setActiveProject,
    deleteProject,
    getProjectTranslations,
    updateProjectTranslations,
  } = useProjects();

  const [currentTranslations, setCurrentTranslations] = useState<TranslationState | null>(null);

  const {
    progress,
    startTranslation,
    incrementProgress,
    finishTranslation,
  } = useTranslationProgress();

  // Load translations when activeProjectId changes
  useEffect(() => {
    if (activeProjectId) {
      const loadTranslations = async () => {
        const translations = await getProjectTranslations(activeProjectId);
        setCurrentTranslations(translations);
      };
      loadTranslations();
    } else {
      setCurrentTranslations(null);
    }
  }, [activeProjectId]);

  const handleJsonSubmit = async (jsonInput: string, language: Language) => {
    if (!activeProjectId) return;
    
    try {
      const json = JSON.parse(jsonInput);
      const entries = Object.keys(json);
      
      startTranslation(entries.length * 2, language, 'en');
      
      const translatedEntries = await processJsonInput(jsonInput, language, {
        onProgress: incrementProgress,
      });
      
      const newState = { entries: translatedEntries, jsonInput };
      await updateProjectTranslations(activeProjectId, newState);
      setCurrentTranslations(newState);
      finishTranslation();
    } catch (error) {
      console.error('Failed to process translations:', error);
      finishTranslation();
    }
  };

  const handleEntryUpdate = async (key: string, language: Language, newValue: string, shouldTranslate = false) => {
    if (!activeProjectId || !currentTranslations) return;
    
    const entryIndex = currentTranslations.entries.findIndex(entry => entry?.key === key);
    if (entryIndex === -1) return;

    try {
      let updatedEntry;
      
      if (shouldTranslate && currentTranslations.entries[entryIndex].values.en) {
        startTranslation(1, 'en', language);
        
        updatedEntry = await updateTranslation(
          currentTranslations.entries[entryIndex],
          'en',
          currentTranslations.entries[entryIndex].values.en,
          language
        );
        
        incrementProgress();
        finishTranslation();
      } else {
        updatedEntry = {
          ...currentTranslations.entries[entryIndex],
          values: {
            ...currentTranslations.entries[entryIndex].values,
            [language]: newValue
          }
        };
      }

      const updatedEntries = [...currentTranslations.entries];
      updatedEntries[entryIndex] = updatedEntry;

      const newState = {
        ...currentTranslations,
        entries: updatedEntries,
      };

      await updateProjectTranslations(activeProjectId, newState);
      setCurrentTranslations(newState);
    } catch (error) {
      console.error('Failed to update translation:', error);
      finishTranslation();
    }
  };

  const handleAddKey = async (newEntry: TranslationEntry) => {
    if (!activeProjectId || !currentTranslations) return;
    
    const newState = {
      ...currentTranslations,
      entries: [...currentTranslations.entries, newEntry],
    };

    await updateProjectTranslations(activeProjectId, newState);
    setCurrentTranslations(newState);
  };

  const handleDeleteKey = async (key: string) => {
    if (!activeProjectId || !currentTranslations) return;
    
    const newState = {
      ...currentTranslations,
      entries: currentTranslations.entries.filter(entry => entry.key !== key),
    };

    await updateProjectTranslations(activeProjectId, newState);
    setCurrentTranslations(newState);
  };

  const handleExport = (language: Language) => {
    if (!activeProjectId || !currentTranslations) return;
    exportTranslations(currentTranslations.entries, language);
  };

  const handlers: TranslationHandlers = {
    createProject,
    setActiveProject,
    deleteProject,
    handleJsonSubmit,
    handleEntryUpdate,
    handleAddKey,
    handleDeleteKey,
    handleExport,
  };

  return {
    projects,
    activeProjectId,
    currentTranslations,
    handlers,
    translationProgress: progress,
  };
}