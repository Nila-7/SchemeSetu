import { createContext, useContext, useState } from "react";
import { translations } from "../translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("schemesetu-language") || "en"
  );

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ta" : "en";

    setLanguage(newLanguage);
    localStorage.setItem("schemesetu-language", newLanguage);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}