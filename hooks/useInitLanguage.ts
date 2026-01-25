import { LANGUAGES } from "@/constants";
import { useLanguageStore } from "@/store";
import { getLocales } from "expo-localization";
import { useEffect } from "react";

export default function useInitLanguage() {
  const isInitLanguage = useLanguageStore((state) => state.isInitLanguage);
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  useEffect(() => {
    if (isInitLanguage && language === null) {
      const locales = getLocales();
      const findLanguageOption = LANGUAGES.find((lang) => lang.code === locales[0].languageTag);

      if (findLanguageOption) {
        setLanguage(findLanguageOption.code);
      }
    }
  }, [isInitLanguage, language, setLanguage]);
}
