export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectState {
  projects: Project[];
  activeProjectId: string | null;
}