// auth.jsx (最终版本)
const API_URL = "/v1";

class AuthService {
  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `登录失败 (${response.status})`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || "网络连接异常");
    }
  }
}

export default new AuthService();
