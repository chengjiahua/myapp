import React, { useState, useEffect, createContext } from "react";
import AuthService from "../services/auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    console.log("sending login");
    try {
      const response = await AuthService.login(credentials);
      console.log("登录响应：", response);
      if (!response.data.token) throw new Error("令牌缺失");
      localStorage.setItem("token", response.data.token);
      setUser({ isAuthenticated: true });
      console.log("用户状态已更新，即将跳转");
      navigate("/");
    } catch (error) {
      console.error("登录失败：", error);
      return error.response?.data?.message || "登录失败";
    }
  };

  const guestLogin = () => {
    login({ username: "guest", password: "guest" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await AuthService.verifyToken(token);
          setUser({ isAuthenticated: true });
        } catch {
          logout();
        }
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, guestLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const RequireAuth = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user?.isAuthenticated ? children : <Navigate to="/login" replace />;
};
