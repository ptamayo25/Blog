import { useState, useCallback, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("blog_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    // Simulate API call
    try {
      setIsLoading(true);
      // Replace with actual API call
      const mockUser = {
        id: 1,
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        role: "user",
      };

      setUser(mockUser);
      localStorage.setItem("blog_user", JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      throw new Error("Login failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("blog_user");
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem("blog_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateProfile,
  };
}
