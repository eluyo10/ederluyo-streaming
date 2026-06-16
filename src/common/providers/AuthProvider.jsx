import { createContext, useMemo, useState } from 'react';
import { authService } from '../../features/auth/services/auth-service.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.getSession());
  const [profile, setProfile] = useState(() => authService.getProfile());
  const [profiles, setProfiles] = useState(() => authService.getProfiles());

  const refreshProfiles = () => {
    setProfiles(authService.getProfiles());
  };

  const value = useMemo(
    () => ({
      session,
      profile,
      profiles,

      login: async (credentials) => {
        const nextSession = await authService.login(credentials);
        setSession(nextSession);
        refreshProfiles();
        return nextSession;
      },

      register: async (payload) => {
        const nextSession = await authService.register(payload);
        setSession(nextSession);
        refreshProfiles();
        return nextSession;
      },

      selectProfile: (selectedProfile) => {
        authService.saveProfile(selectedProfile);
        setProfile(selectedProfile);
      },

      logout: () => {
        authService.logout();
        setSession(null);
        setProfile(null);
      },

      clearProfile: () => {
        authService.clearProfile();
        setProfile(null);
      },
    }),
    [session, profile, profiles]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}