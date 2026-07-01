import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  registerUser,
  loginUser,
  saveSession,
  clearSession,
  getStoredUser,
  isAuthenticated as checkIsAuthenticated,
} from "../models/authModel";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [isLoggedIn, setIsLoggedIn] = useState(checkIsAuthenticated());

  useEffect(() => {
    setUser(getStoredUser());
    setIsLoggedIn(checkIsAuthenticated());
  }, []);

  return React.createElement(
    AuthContext.Provider,
    { value: { user, setUser, isLoggedIn, setIsLoggedIn } },
    children
  );
};

export const useAuthController = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthController must be used within an AuthProvider");
  }
  const { user, setUser, isLoggedIn, setIsLoggedIn } = context;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async (formData) => {
    setLoading(true);
    setError("");
    try {
      const data = await registerUser(formData);
      const loginData = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      saveSession(loginData.token, loginData.user);
      setUser(loginData.user);
      setIsLoggedIn(true);
      toast.success(`🎉 Welcome aboard, ${loginData.user?.name || "User"}! Account created successfully.`);
      navigate("/products");
    } catch (err) {
      setError(err.message);
      toast.error(`Registration failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError("");
    try {
      const data = await loginUser(credentials);
      saveSession(data.token, data.user);
      setUser(data.user);
      setIsLoggedIn(true);
      toast.success(`👋 Welcome back, ${data.user?.name || "User"}!`);
      navigate("/products");
    } catch (err) {
      setError(err.message);
      toast.error(`Login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearSession();
    setUser(null);
    setIsLoggedIn(false);
    toast.info("You have been logged out.");
    navigate("/");
  };

  return {
    user,
    loading,
    error,
    isLoggedIn,
    register,
    login,
    logout,
  };
};
