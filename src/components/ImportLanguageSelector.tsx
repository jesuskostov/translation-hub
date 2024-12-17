import React from "react";
import { Language, LANGUAGES } from "../types/translation";

interface ImportLanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function ImportLanguageSelector({
  selectedLanguage,
  onLanguageChange,
}: ImportLanguageSelectorProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor="import-language"
        className="text-sm font-medium text-gray-700"
      >
        Select Import Language
      </label>
      <select
        id="import-language"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="form-select h-12 border p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
      >
        {Object.entries(LANGUAGES).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
