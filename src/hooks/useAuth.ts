import { useState, useEffect } from "react";

interface AuthUser {
  id: number;
  username: string;
  role: string;
  fullName: string;
}

interface UseAuthReturn {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize with mock admin user for demo purposes
    // In a real app, this would check for stored auth tokens
    const mockAdminUser: AuthUser = {
      id: 1,
      username: "admin",
      role: "Super Admin",
      fullName: "Admin User",
    };
    
    setUser(mockAdminUser);
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock login logic - in real app, this would make API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      if (username === "admin" && password === "admin") {
        const adminUser: AuthUser = {
          id: 1,
          username: "admin",
          role: "Super Admin",
          fullName: "Admin User",
        };
        setUser(adminUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // In real app, clear auth tokens and redirect
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}
