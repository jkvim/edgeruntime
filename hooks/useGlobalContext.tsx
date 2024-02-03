import React, { ReactNode, useContext, useEffect, useState } from "react";
import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";
import { HTMLContent } from "@/types/types";


type ContextValue = {
  theme: string;
  setTheme: (theme: string) => void;
  setHTMLContent: (content: HTMLContent) => void;
  htmlContent: HTMLContent;
};

export const GlobalContext = React.createContext<ContextValue | null>(null);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>(DARK_THEME);
  const [htmlContent, setHTMLContent] = useState<HTMLContent>({
    html: "",
    css: "",
    js: "",
  });

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme.matches) {
      setTheme(DARK_THEME);
    } else {
      setTheme(LIGHT_THEME)
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        setTheme,
        htmlContent,
        setHTMLContent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)

  if (!context) throw new Error('Missing Context value')

  return context
}
