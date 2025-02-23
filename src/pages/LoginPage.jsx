import React, { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const LoginPage = () => {
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
};
