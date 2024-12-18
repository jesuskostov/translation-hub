import { FolderOpen, Trash2, Clock } from "lucide-react";
import type { Project } from "../types/project";

interface ProjectListProps {
  projects: Project[];
  activeProjectId: string | null;
  onProjectSelect: (projectId: string) => void;
  onProjectDelete: (projectId: string) => void;
}

export function ProjectList({
  projects,
  activeProjectId,
  onProjectSelect,
  onProjectDelete,
}: ProjectListProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className={`p-4 rounded-lg transition-all cursor-pointer ${
            project.id === activeProjectId
              ? "bg-blue-50 border-2 border-blue-500"
              : "bg-white border border-gray-200 hover:border-blue-300"
          }`}
          onClick={() => onProjectSelect(project.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FolderOpen
                className={`w-5 h-5 ${
                  project.id === activeProjectId
                    ? "text-blue-500"
                    : "text-gray-400"
                }`}
              />
              <h3 className="font-medium text-gray-900">{project.name}</h3>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onProjectDelete(project.id);
              }}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <time dateTime={project.updatedAt}>
              {new Date(project.updatedAt).toLocaleDateString()}
            </time>
          </div>
        </div>
      ))}
    </div>
  );
}
