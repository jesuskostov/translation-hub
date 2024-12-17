export type Language = "none" | "en" | "it" | "fr";

export interface TranslationValue {
  none: string;
  en: string;
  it: string;
  fr: string;
}

export interface TranslationEntry {
  key: string;
  values: TranslationValue;
}

export interface TranslationState {
  entries: TranslationEntry[];
  jsonInput: string;
}

export const LANGUAGES: Record<Language, string> = {
  none: "Select",
  en: "English",
  it: "Italian",
  fr: "French",
};

export const createEmptyTranslationValue = (): TranslationValue => ({
  none: "",
  en: "",
  it: "",
  fr: "",
});
