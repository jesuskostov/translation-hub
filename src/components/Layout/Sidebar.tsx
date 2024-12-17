import React from "react";
import { ProjectCreate } from "../ProjectCreate";
import { ProjectList } from "../ProjectList";
import { ExportMenu } from "../ExportMenu";
import type { Project } from "../../types/project";
import type { Language } from "../../types/translation";

interface SidebarProps {
  projects: Project[];
  activeProjectId: string | null;
  onProjectCreate: (name: string) => void;
  onProjectSelect: (id: string) => void;
  onProjectDelete: (id: string) => void;
  onExport: (language: Language) => void;
  hasTranslations: boolean;
}

export function Sidebar({
  projects,
  activeProjectId,
  onProjectCreate,
  onProjectSelect,
  onProjectDelete,
  onExport,
  hasTranslations,
}: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 pt-16 w-72 h-screen bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Projects</h2>
          <ProjectCreate onProjectCreate={onProjectCreate} />
        </div>

        {projects.length > 0 && (
          <ProjectList
            projects={projects}
            activeProjectId={activeProjectId}
            onProjectSelect={onProjectSelect}
            onProjectDelete={onProjectDelete}
          />
        )}

        {hasTranslations && (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Export</h3>
            <ExportMenu onExport={onExport} />
          </div>
        )}
      </div>
    </aside>
  );
}
