import { ErrorBoundary } from "../ErrorBoundary";
import { JsonInput } from "../JsonInput";
import { TranslationTable } from "../TranslationTable";
import type { TranslationState } from "../../types/translation";
import type { TranslationHandlers } from "../../types/handlers";

interface MainContentProps {
  activeProjectId: string | null;
  currentTranslations: TranslationState | null;
  handlers: TranslationHandlers;
}

export function MainContent({
  activeProjectId,
  currentTranslations,
  handlers,
}: MainContentProps) {
  return (
    <main className="ml-64 p-8">
      <div className="max-w-6xl mx-auto">
        <ErrorBoundary>
          {activeProjectId ? (
            !currentTranslations?.entries.length ? (
              <JsonInput onJsonSubmit={handlers.handleJsonSubmit} />
            ) : (
              <TranslationTable
                entries={currentTranslations.entries}
                onEntryUpdate={handlers.handleEntryUpdate}
                onAddKey={handlers.handleAddKey}
                onDeleteKey={handlers.handleDeleteKey}
                onExport={handlers.handleExport}
              />
            )
          ) : (
            <div className="text-center py-12 text-gray-500">
              Select or create a project to start translating
            </div>
          )}
        </ErrorBoundary>
      </div>
    </main>
  );
}
