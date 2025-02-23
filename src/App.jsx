import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import AuthService from "./services/auth.jsx";
import GameCenter from "./games/gameCenter.jsx";
import "./App.css";

// 新增身份验证上下文
const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    console.log("sending login");
    try {
      const response = await AuthService.login(credentials);
      console.log("登录响应：", response); // 添加调试日志
      if (!response.data.token) throw new Error("令牌缺失");
      localStorage.setItem("token", response.data.token);
      setUser({ isAuthenticated: true });
      console.log("用户状态已更新，即将跳转"); // 添加调试日志
      navigate("/");
    } catch (error) {
      console.error("登录失败：", error); // 添加调试日志
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
}

// 新增登录页面组件
function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login, guestLogin } = React.useContext(AuthContext);

  const handleSubmit = async (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    localStorage.setItem("username", credentials.username);
    const result = await login(credentials);
    if (result) setError(result);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>游戏中心登录</h2>
        <div>
          <label>用户名：</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </div>
        <div>
          <label>密码：</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="button-group">
          <button type="submit">登录</button>
          <button type="button" onClick={guestLogin}>
            游客登录
          </button>
          <button type="button" onClick={() => alert("跳转到注册页面")}>
            注册
          </button>
        </div>
      </form>
    </div>
  );
}

// 应用入口组件
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <GameCenter />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

function RequireAuth({ children }) {
  const { user } = React.useContext(AuthContext);
  return user?.isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default App;
