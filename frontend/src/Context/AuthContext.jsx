import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    return savedUser && savedToken ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", accessToken);
  };

  const createUser = async (formData) => {
    try {
      const registerData = {
        email: formData.email,
        name: formData.name,
        password: formData.password,
      };
      const response = await axios.post(
        "http://localhost:5000/register",
        registerData
      );

      const { accessToken, user } = response.data;
      login(user, accessToken);
      setUser(user);
      toast.success("User Registered Successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data || "Registration failed. Please try again."
      );
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, login, logout, createUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
