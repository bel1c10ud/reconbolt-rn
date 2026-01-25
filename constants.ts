import { LanguageCode } from "./types";

export const WEB_ENDPOINT = "https://reconbo.lt";

export const LOGIN_URL =
  "https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid";

export const URL_WITH_TOKEN_PATTERN =
  /https:\/\/playvalorant\.com(?:\/.+?)?\/opt_in(?:\/)?#access_token=(.+?)&scope=.+?&iss=.+?&id_token=(.+?)&token_type=Bearer&session_state=.+?&expires_in=\d+/;

export const hiddenHeaderAndFooterScriptString = `
    const style = document.createElement('style');
    style.textContent = \`
      #__next { padding-bottom: 5rem; }
      header, footer { display: none !important; }
    \`;
    document.head.appendChild(style);  
  `;

export const COLOR = {
  DARK: {
    GRAY: {
      50: "#171717",
      100: "#1f1f1f",
      200: "#313131",
      300: "#525252",
      400: "#737373",
      500: "#a3a3a3",
      600: "#d4d4d4",
      700: "#f5f5f5",
      800: "#fafafa",
      900: "#ffffff",
    },
  },
  LIGHT: {
    GRAY: {
      50: "#ffffff",
      100: "#fafafa",
      200: "#f5f5f5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#313131",
      800: "#1f1f1f",
      900: "#171717",
    },
  },
};

export const LANGUAGES: {
  code: LanguageCode;
  name: string;
  altName?: string;
}[] = [
  {
    code: "ko-KR",
    name: "한국어",
    altName: "Korean",
  },
  {
    code: "en-US",
    name: "English",
  },
  {
    code: "ja-JP",
    name: "日本語",
    altName: "Japanese",
  },
] as const;
