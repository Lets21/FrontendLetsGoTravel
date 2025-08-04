"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    const res = await fetch("https://backendletsgotravel.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem("adminToken", data.token); // Guarda el token
      router.push("/admin/destinations"); // Redirige al panel
    } else {
      setError(data.message || "Credenciales inválidas");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border w-full mb-4 p-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border w-full mb-4 p-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button className="bg-gold-500 text-black font-bold w-full py-2 rounded" type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
}
