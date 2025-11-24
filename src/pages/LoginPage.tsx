import { useState } from "react";
import { authApi } from "../api/authApi";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuth((s) => s.setToken);
  const setRole = useAuth((s) => s.setRole);
  const navigate = useNavigate();

  async function handleLogin(e: any) {
    e.preventDefault();

    try {
      const res = await authApi.login(email, password);

      const token = res.data.token;
      const role = res.data.role;

      setToken(token);
      setRole(role);

      navigate("/admin/dashboard");
    } catch (err) {
      alert("Sai tài khoản hoặc mật khẩu");
      console.error(err);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full rounded mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
