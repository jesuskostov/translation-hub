import React from "react";
import { Upload, FileJson, AlertCircle } from "lucide-react";
import { ImportLanguageSelector } from "./ImportLanguageSelector";
import { Language } from "../types/translation";

interface JsonInputProps {
  onJsonSubmit: (json: string, language: Language) => void;
}

export function JsonInput({ onJsonSubmit }: JsonInputProps) {
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState("");
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<Language>("none");

  const handleSubmit = () => {
    try {
      JSON.parse(input);
      setError("");
      onJsonSubmit(input, selectedLanguage);
    } catch {
      setError("Invalid JSON format");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInput(text);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center space-x-3">
            <FileJson className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Import Translations
            </h2>
          </div>
          <p className="mt-2 text-gray-600">
            Select the language and paste your JSON or drag and drop your file
          </p>
        </div>

        <div className="p-8 space-y-6">
          <ImportLanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />

          {selectedLanguage !== "none" && (
            <div
              className={`relative border-2 border-dashed rounded-xl transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <textarea
                className="w-full h-64 p-4 bg-transparent resize-none focus:outline-none"
                placeholder="Paste your JSON here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {isDragging && (
                <div className="absolute inset-0 bg-blue-50 bg-opacity-90 flex items-center justify-center">
                  <p className="text-blue-600 font-medium">
                    Drop your file here
                  </p>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="flex items-center space-x-2 text-red-500">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}
          {selectedLanguage !== "none" && (
            <button
              onClick={handleSubmit}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors flex items-center justify-center space-x-2 font-medium"
            >
              <Upload className="w-5 h-5" />
              <span>Import JSON</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
