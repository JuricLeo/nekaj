import { create } from "zustand";

interface LanguageState {
  selectedLanguage: string;
  translations: Record<string, Record<string, string>>;
  setSelectedLanguage: (language: string) => void;
  t: (key: string) => string;
}

const useLanguageStore = create<LanguageState>((set) => {
  const translations = require("@/constants/lang.json");
  let selectedLanguage = "hr";

  if (typeof window !== "undefined") {
    selectedLanguage = localStorage.getItem("selectedLanguage") || "en";
  }

  return {
    selectedLanguage,
    translations: translations,
    setSelectedLanguage: (language) => {
      selectedLanguage = language;
      set({ selectedLanguage: language });
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedLanguage", language);
      }
    },
    t: (key) => {
      const keys = key.split(".");
      let value: any = translations[selectedLanguage];

      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) return key;
      }

      return value;
    },
  };
});

export default useLanguageStore;
