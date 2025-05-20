import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { loginService } from '@/services/authService';
import { api } from '@/services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isAdmin?: boolean;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      const storedUser = await SecureStore.getItemAsync('user');
      const storedToken = await SecureStore.getItemAsync('token');
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));

        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  async function signIn(username: string, password: string) {
    const response = await loginService(username, password);

    setUser(response.user);

    await SecureStore.setItemAsync('user', JSON.stringify(response.user));
    await SecureStore.setItemAsync('token', response.access_token);

    api.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;
    router.replace('/');

  };

  async function signOut() {
    setUser(null);
    await SecureStore.deleteItemAsync('user');
    await SecureStore.deleteItemAsync('token');

    delete api.defaults.headers.common['Authorization'];

    router.replace('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
