import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { Project, ProjectState } from "../types/project";
import type { TranslationState, TranslationEntry } from "../types/translation";

export function useProjects() {
  const [projectState, setProjectState] = useState<ProjectState>({
    projects: [],
    activeProjectId: null,
  });

  // Load projects on mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setProjectState((prev) => ({
        ...prev,
        projects: projects.map((p) => ({
          id: p.id,
          name: p.name,
          createdAt: p.created_at,
          updatedAt: p.updated_at,
        })),
      }));
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };

  const createProject = async (name: string) => {
    try {
      const { data: project, error } = await supabase
        .from("projects")
        .insert([{ name }])
        .select()
        .single();

      if (error || !project) throw error;

      const newProject: Project = {
        id: project.id,
        name: project.name,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
      };

      setProjectState((prev) => ({
        projects: [newProject, ...prev.projects],
        activeProjectId: newProject.id,
      }));

      return newProject;
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const setActiveProject = (projectId: string) => {
    setProjectState((prev) => ({
      ...prev,
      activeProjectId: projectId,
    }));
  };

  const deleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;

      setProjectState((prev) => ({
        projects: prev.projects.filter((p) => p.id !== projectId),
        activeProjectId:
          prev.activeProjectId === projectId ? null : prev.activeProjectId,
      }));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const getProjectTranslations = async (
    projectId: string
  ): Promise<TranslationState> => {
    try {
      const { data: translations, error } = await supabase
        .from("translations")
        .select("*")
        .eq("project_id", projectId);

      if (error) throw error;

      const entries: TranslationEntry[] = translations.map((t) => ({
        key: t.key,
        values: {
          none: t?.none || "",
          en: t?.en || "",
          fr: t?.fr || "",
          it: t?.it || "",
        },
        created_at: t.created_at,
        order: t.order,
      }));

      return { entries, jsonInput: "" };
    } catch (error) {
      console.error("Error loading translations:", error);
      return { entries: [], jsonInput: "" };
    }
  };

  const updateProjectTranslations = async (
    projectId: string,
    translations: TranslationState
  ) => {
    try {
      // Delete existing translations
      await supabase.from("translations").delete().eq("project_id", projectId);

      if (translations.entries.length > 0) {
        // Insert new translations
        const { error } = await supabase.from("translations").insert(
          translations.entries.map((entry) => ({
            project_id: projectId,
            key: entry.key,
            en: entry?.values?.en || "",
            fr: entry?.values?.fr || "",
            it: entry?.values?.it || "",
            order: entry.order,
          }))
        );

        if (error) throw error;
      }

      // Update project timestamp
      await supabase
        .from("projects")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", projectId);
    } catch (error) {
      console.error("Error updating translations:", error);
    }
  };

  return {
    projects: projectState.projects,
    activeProjectId: projectState.activeProjectId,
    createProject,
    setActiveProject,
    deleteProject,
    getProjectTranslations,
    updateProjectTranslations,
  };
}
