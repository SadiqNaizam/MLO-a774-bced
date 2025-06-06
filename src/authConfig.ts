// src/authConfig.ts

/**
 * WARNING: MSAL (Microsoft Authentication Library) integration requires adding
 * 'msal-browser' and 'msal-react' dependencies to package.json.
 * This is currently not allowed by the MLO assistant's constraints.
 *
 * The configuration below is a placeholder for what would be required
 * if MSAL were properly integrated.
 *
 * Replace with your actual Azure App Registration details.
 */

export const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID_PLACEHOLDER", // Replace with your Application (client) ID
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID_PLACEHOLDER", // Replace with your Directory (tenant) ID or "common" for multi-tenant
    redirectUri: "http://localhost:3000", // Or your deployed app's redirect URI
    postLogoutRedirectUri: "http://localhost:3000", // Or your deployed app's post logout redirect URI
  },
  cache: {
    cacheLocation: "sessionStorage", // "sessionStorage" or "localStorage"
    storeAuthStateInCookie: false, // Set to true if you have issues on IE11 or Edge
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequestScopes = {
  scopes: ["User.Read"] // Basic scope to read user's profile
};

// Add scopes here for access token to be used at Microsoft Graph API endpoints.
export const graphScopes = {
    scopes: ["User.Read"]
};

// Add scopes here for custom API access if needed
// export const apiRequestScopes = {
//   scopes: ["api://YOUR_API_CLIENT_ID_PLACEHOLDER/Your.Scope"]
// };

/**
 * In a real MSAL setup, you would initialize PublicClientApplication here:
 *
 * import { PublicClientApplication, LogLevel } from "@azure/msal-browser";
 *
 * export const msalInstance = new PublicClientApplication(msalConfig);
 *
 * // Optional: Configure logging for MSAL
 * msalInstance.setLoggerOptions({
 *   loggerCallback: (level, message, containsPii) => {
 *     if (containsPii) {
 *       return;
 *     }
 *     switch (level) {
 *       case LogLevel.Error:
 *         console.error(message);
 *         return;
 *       case LogLevel.Info:
 *         console.info(message);
 *         return;
 *       case LogLevel.Verbose:
 *         console.debug(message);
 *         return;
 *       case LogLevel.Warning:
 *         console.warn(message);
 *         return;
 *       default:
 *         return;
 *     }
 *   },
 *   piiLoggingEnabled: false,
 *   logLevel: LogLevel.Info, // Adjust as needed for debugging
 * });
 *
 * And then pass `msalInstance` to the MsalProvider in your app's entry point (e.g., main.tsx or App.tsx).
 */