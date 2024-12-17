import { useState } from "react";
import { Search, X, Loader2, Languages } from "lucide-react";
import type { TranslationEntry, Language } from "../types/translation";
// import { LanguageSelector } from "./LanguageSelector";
// import { ExportMenu } from "./ExportMenu";

interface TranslationTableProps {
  entries: TranslationEntry[];
  onEntryUpdate: (key: string, language: Language, newValue: string) => void;
  onExport: (language: Language) => void;
}

export function TranslationTable({
  entries,
  onEntryUpdate,
}: // onExport,
TranslationTableProps) {
  const [search, setSearch] = useState("");
  const [editingCell, setEditingCell] = useState<{
    key: string;
    lang: Language;
  } | null>(null);
  // const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [isTranslating] = useState(false);

  const filteredEntries = entries.filter(
    (entry) =>
      entry.key.toLowerCase().includes(search.toLowerCase()) ||
      Object.values(entry.values).some((value) =>
        value.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {entries.length} translations loaded
            </h2>
          </div>
          {/* <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            /> */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search translations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {/* <ExportMenu onExport={onExport} /> */}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                  Translation Key
                </th>
                {(["en", "it", "fr"] as Language[]).map((lang) => (
                  <th
                    key={lang}
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center space-x-2">
                      <Languages className="w-4 h-4" />
                      <span>{lang.toUpperCase()}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEntries.map((entry) => (
                <tr
                  key={entry.key}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {entry.key.split(".").pop()}
                      </span>
                      <span className="text-xs text-gray-500">{entry.key}</span>
                    </div>
                  </td>
                  {(["en", "it", "fr"] as Language[]).map((lang) => (
                    <td key={lang} className="px-6 py-4">
                      <div className="relative">
                        <textarea
                          value={entry.values[lang]}
                          onChange={(e) =>
                            onEntryUpdate(entry.key, lang, e.target.value)
                          }
                          className={`w-full px-3 py-1.5 rounded transition-all resize-none min-h-[60px] ${
                            editingCell?.key === entry.key &&
                            editingCell?.lang === lang
                              ? "border-2 border-blue-500 bg-white ring-2 ring-blue-200"
                              : "border border-transparent bg-transparent hover:border-gray-300"
                          }`}
                          onFocus={() =>
                            setEditingCell({ key: entry.key, lang })
                          }
                          onBlur={() => setEditingCell(null)}
                          placeholder={`Enter ${lang.toUpperCase()} translation...`}
                        />
                        {isTranslating &&
                          editingCell?.key === entry.key &&
                          editingCell?.lang === lang && (
                            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                            </div>
                          )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
