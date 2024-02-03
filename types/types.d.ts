export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4';

export interface TranslateBody {
  inputLanguage: string;
  outputLanguage: string;
  inputCode: string;
  model: OpenAIModel;
  apiKey: string;
}

export interface TranslateResponse {
  code: string;
}

declare interface Window {
  markmap: unknown;
}

export type Token = {
  key: string;
  date?: number;
  count?: number;
  ip: string;
}

export type HTMLContent = {
  html?: string;
  css?: string;
  js?: string;
}

export type MDXTheme = {
  id: string;
  background: string;
  color: string;
  revertColor: string;
  dividerColor: string;
  quote?: React.CSSProperties;
  noise?: string;
  textAlign?: string;
  grainy?: boolean;
  fontFamily?: string;
  backgroundImage?: string;
};