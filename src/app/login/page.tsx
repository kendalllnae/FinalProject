"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { email: storedEmail, password: storedPassword } = JSON.parse(storedUserData);

      // Check if entered credentials match stored credentials
      if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("isLoggedIn", "true"); // Mark user as logged in
        router.push("/"); // Redirect to home page
      } else {
        setError("Invalid email or password");
      }
    } else {
      setError("No account found. Please sign up first.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
      <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>Login</button>
      </form>
    </div>
  );
}