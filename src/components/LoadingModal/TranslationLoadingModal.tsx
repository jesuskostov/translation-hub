import { Languages, Loader2 } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import type { Language } from "../../types/translation";

interface TranslationLoadingModalProps {
  progress: number;
  total: number;
  sourceLang: Language;
  targetLang: Language;
}

export function TranslationLoadingModal({
  progress,
  total,
}: // sourceLang,
// targetLang,
TranslationLoadingModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Languages className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Translating Content
            </h2>
            {/* <p className="text-sm text-gray-600 mt-1">
              {sourceLang.toUpperCase()} → {targetLang.toUpperCase()}
            </p> */}
          </div>
        </div>

        <div className="space-y-6">
          <ProgressBar progress={progress} total={total} />

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing translations...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
