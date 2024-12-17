import React, { useState } from "react";
import { FolderPlus } from "lucide-react";

interface ProjectCreateProps {
  onProjectCreate: (name: string) => void;
}

export function ProjectCreate({ onProjectCreate }: ProjectCreateProps) {
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onProjectCreate(name.trim());
      setName("");
      setIsCreating(false);
    }
  };

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg
                   text-gray-500 hover:border-blue-500 hover:text-blue-500
                   transition-colors flex items-center justify-center space-x-2"
      >
        <FolderPlus className="w-5 h-5" />
        <span>Create New Project</span>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg border border-gray-200"
    >
      <label
        htmlFor="project-name"
        className="block text-sm font-medium text-gray-700"
      >
        Project Name
      </label>
      <div className="mt-1 flex flex-col">
        <input
          type="text"
          id="project-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-10 p-2 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4"
          placeholder="Enter project name..."
          autoFocus
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-2
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!name.trim()}
        >
          Create
        </button>
        <button
          type="button"
          onClick={() => setIsCreating(false)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200
                     transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
