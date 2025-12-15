'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () =>void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users para desarrollo (en producción esto vendría de una API/base de datos)
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'admin@juegosdemesa.com',
    name: 'Administrador',
    role: 'admin',
    joinedDate: '2024-01-01',
  },
  {
    id: '2',
    email: 'usuario@juegosdemesa.com',
    name: 'Usuario Demo',
    role: 'user',
    joinedDate: '2024-06-15',
  },
];

// Passwords demo (en producción usar hash seguro)
const DEMO_PASSWORDS: Record<string, string> = {
  'admin@juegosdemesa.com': 'admin123',
  'usuario@juegosdemesa.com': 'user123',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Buscar usuario
    const foundUser = DEMO_USERS.find(u => u.email === email);
    
    if (foundUser && DEMO_PASSWORDS[email] === password) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Verificar si el email ya existe
    if (DEMO_USERS.some(u => u.email === email)) {
      return false;
    }

    // Crear nuevo usuario
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    // Agregar a demo users y passwords
    DEMO_USERS.push(newUser);
    DEMO_PASSWORDS[email] = password;

    // Auto-login después de registro
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
