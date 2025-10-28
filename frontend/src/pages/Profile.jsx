import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMsg("Please login first");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

        setUser(data);
      } catch (err) {
        setMsg(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (msg) return <div className="card error">{msg}</div>;

  if (!user) return <div className="card">Loading...</div>;

  return (
    <div className="card">
      <h2>Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>ID:</strong> {user._id}
      </p>
    </div>
  );
}
