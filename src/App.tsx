import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { MainContent } from './components/Layout/MainContent';
import { TranslationLoadingModal } from './components/LoadingModal/TranslationLoadingModal';
import { useTranslationManager } from './hooks/useTranslationManager';

export default function App() {
  const {
    projects,
    activeProjectId,
    currentTranslations,
    handlers,
    translationProgress
  } = useTranslationManager();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Sidebar
          projects={projects}
          activeProjectId={activeProjectId}
          onProjectCreate={handlers.createProject}
          onProjectSelect={handlers.setActiveProject}
          onProjectDelete={handlers.deleteProject}
          onExport={handlers.handleExport}
          hasTranslations={Boolean(currentTranslations?.entries.length)}
        />
        <MainContent
          activeProjectId={activeProjectId}
          currentTranslations={currentTranslations}
          handlers={handlers}
        />
        
        {translationProgress.isTranslating && translationProgress.sourceLang && translationProgress.targetLang && (
          <TranslationLoadingModal
            progress={translationProgress.progress}
            total={translationProgress.total}
            sourceLang={translationProgress.sourceLang}
            targetLang={translationProgress.targetLang}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}