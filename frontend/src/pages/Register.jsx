import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      {msg && <div className="error">{msg}</div>}
      <form onSubmit={submit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={onChange} required />
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          required
        />
        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
