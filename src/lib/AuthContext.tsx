// src/lib/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { msalConfig, loginRequestScopes } from '@/authConfig'; // Would be used in real MSAL

/**
 * WARNING: This is a placeholder/mock AuthContext.
 * Proper MSAL integration requires 'msal-browser' and 'msal-react' dependencies,
 * which cannot be added under current MLO constraints.
 * This context simulates authentication state for UI demonstration purposes.
 */

interface AccountInfo { // Simplified version of MSAL's AccountInfo
  homeAccountId: string;
  environment: string;
  tenantId: string;
  username: string; // Typically email or UPN
  localAccountId: string;
  name?: string;
  idTokenClaims?: {
    [key: string]: any;
    name?: string;
    preferred_username?: string;
    oid?: string; // Object ID of the user
  };
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AccountInfo | null;
  login: () => void; // In real MSAL, this would likely trigger a redirect or popup
  logout: () => void; // In real MSAL, this would trigger a redirect or popup
  acquireToken: (scopes: string[]) => Promise<string | null>; // Simulates acquiring a token
  // In a real MSAL setup, you'd have:
  // instance: IPublicClientApplication;
  // accounts: AccountInfo[];
  // And methods like acquireTokenSilent, acquireTokenPopup, etc.
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AccountInfo | null>(null);

  // Simulate checking auth status on load (e.g., from session storage or a silent MSAL call)
  useEffect(() => {
    const storedAuth = sessionStorage.getItem('mockAuth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        if (authData.isAuthenticated && authData.user) {
          setIsAuthenticated(true);
          setUser(authData.user);
        }
      } catch (error) {
        console.error("Failed to parse mockAuth from session storage", error);
        sessionStorage.removeItem('mockAuth');
      }
    }
    // In a real MSAL app, you might use `useMsalAuthentication(InteractionType.Silent, loginRequestScopes)`
    // or check `instance.getAllAccounts().length > 0` here.
  }, []);

  const login = () => {
    // Simulate a login process
    console.warn(
      "Mock login function called. In a real MSAL app, this would trigger MSAL's loginPopup or loginRedirect."
      // Example: instance.loginRedirect(loginRequestScopes).catch(e => console.error(e));
    );
    const mockUser: AccountInfo = {
      homeAccountId: "mock-home-account-id.mock-tenant-id",
      environment: "login.windows.net",
      tenantId: "mock-tenant-id",
      username: "mockuser@example.com",
      localAccountId: "mock-local-account-id",
      name: "Mock User",
      idTokenClaims: {
        name: "Mock User",
        preferred_username: "mockuser@example.com",
        oid: "mock-object-id"
      },
    };
    setIsAuthenticated(true);
    setUser(mockUser);
    sessionStorage.setItem('mockAuth', JSON.stringify({ isAuthenticated: true, user: mockUser }));
    alert(`Mock Login Successful! Welcome, ${mockUser.name}. (This is a simulation)`);
  };

  const logout = () => {
    // Simulate a logout process
    console.warn(
      "Mock logout function called. In a real MSAL app, this would trigger MSAL's logoutPopup or logoutRedirect."
      // Example: instance.logoutRedirect({ postLogoutRedirectUri: msalConfig.auth.postLogoutRedirectUri });
    );
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.removeItem('mockAuth');
    alert("Mock Logout Successful! (This is a simulation)");
  };

  const acquireToken = async (scopes: string[]): Promise<string | null> => {
    console.warn(
      `Mock acquireToken called for scopes: ${scopes.join(", ")}. ` +
      "In a real MSAL app, this would attempt to acquire a token silently or interactively."
      // Example:
      // const account = instance.getActiveAccount() || instance.getAllAccounts()[0];
      // if (!account) throw Error("No active account! User must be logged in.");
      // const response = await instance.acquireTokenSilent({ scopes, account });
      // return response.accessToken;
    );
    if (isAuthenticated) {
      return Promise.resolve(`mock-access-token-for-${scopes.join('-')}`);
    }
    return Promise.resolve(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, acquireToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};