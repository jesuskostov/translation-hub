import React from "react";
import { Save, ChevronDown } from "lucide-react";
import { Language, LANGUAGES } from "../types/translation";

interface ExportMenuProps {
  onExport: (language: Language) => void;
}

export function ExportMenu({ onExport }: ExportMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <div className="flex">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                   transition-colors flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>Export</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            {Object.entries(LANGUAGES)
              .slice(1)
              .map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => {
                    onExport(code as Language);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Export {name}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
