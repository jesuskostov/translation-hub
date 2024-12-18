import { useState, useEffect } from "react";
import { Search, X, Loader2, Languages } from "lucide-react";
import type { TranslationEntry, Language } from "../types/translation";

interface TranslationTableProps {
  entries: TranslationEntry[];
  onEntryUpdate: (
    key: string,
    language: Language,
    newValue: string
  ) => Promise<void>;
  onAddKey: (entry: TranslationEntry) => void;
  onDeleteKey: (key: string) => void;
  onExport: (language: Language) => void;
}

export function TranslationTable({
  entries,
  onEntryUpdate,
}: TranslationTableProps) {
  const [search, setSearch] = useState("");

  const [editingCell, setEditingCell] = useState<{
    key: string;
    lang: Language;
  } | null>(null);
  const [saving, setSaving] = useState<{ key: string; lang: Language } | null>(
    null
  );
  const [successCell, setSuccessCell] = useState<{
    key: string;
    lang: Language;
  } | null>(null);

  const [tempValues, setTempValues] = useState<{
    [key: string]: { [lang in Language]: string };
  }>({});

  useEffect(() => {
    // Update tempValues whenever 'entries' changes
    const newTempValues = entries.reduce((acc, entry) => {
      acc[entry.key] = { ...entry.values };
      return acc;
    }, {} as { [key: string]: { [lang in Language]: string } });

    setTempValues(newTempValues); // Update the state with new values
  }, [entries]); // This effect will run whenever 'entries' changes

  const handleBlur = async (key: string, lang: Language) => {
    if (
      tempValues[key][lang] === entries.find((e) => e.key === key)?.values[lang]
    )
      return; // Prevent unnecessary updates

    setSaving({ key, lang });
    try {
      await onEntryUpdate(key, lang, tempValues[key][lang]);
      setSuccessCell({ key, lang });
      setTimeout(() => setSuccessCell(null), 1000); // Reset success indicator after 1 second
    } catch (error) {
      console.error("Failed to update:", error);
    } finally {
      setSaving(null);
      setEditingCell(null);
    }
  };

  const handleChange = (key: string, lang: Language, newValue: string) => {
    setTempValues((prev) => ({
      ...prev,
      [key]: { ...prev[key], [lang]: newValue },
    }));
  };

  const filteredEntries = entries
    .filter((entry) => {
      const matchesSearch =
        entry.key.toLowerCase().includes(search.toLowerCase()) ||
        Object.values(entry.values).some((value) =>
          value.toLowerCase().includes(search.toLowerCase())
        );

      return matchesSearch; // Only filter by search term
    })
    .sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="text-2xl font-bold text-gray-800">
            {entries.length} translations loaded
          </h2>
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
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider w-auto">
                  Translation Key
                </th>
                {(["en", "it", "fr"] as Language[]).map((lang) => (
                  <th
                    key={lang}
                    className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider "
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
                    <span className="text-sm font-medium text-gray-900">
                      {entry.key}
                    </span>
                  </td>
                  {(["en", "it", "fr"] as Language[]).map((lang) => (
                    <td key={lang} className="px-6 py-4">
                      <div className="relative">
                        <textarea
                          value={tempValues[entry.key]?.[lang] || ""} // Add fallback to empty string if undefined
                          onChange={(e) =>
                            handleChange(entry.key, lang, e.target.value)
                          }
                          onFocus={() =>
                            setEditingCell({ key: entry.key, lang })
                          }
                          onBlur={() => handleBlur(entry.key, lang)}
                          className={`w-full px-3 py-1.5  min-h-[60px] transition-all ${
                            editingCell?.key === entry.key &&
                            editingCell?.lang === lang
                              ? " bg-white ring-2 ring-blue-200"
                              : "border border-transparent bg-transparent hover:border-gray-300"
                          } ${
                            successCell?.key === entry.key &&
                            successCell?.lang === lang
                              ? "ring-2 ring-green-300"
                              : ""
                          }`}
                          placeholder={`Enter ${lang.toUpperCase()} translation...`}
                        />

                        {saving?.key === entry.key && saving?.lang === lang && (
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
