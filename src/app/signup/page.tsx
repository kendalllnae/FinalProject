"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username && email && password) {
      // Save user details to localStorage
      const userData = { username, email, password };
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true"); // Mark user as logged in

      router.push("/"); // Redirect to home page
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign Up</h1>
      <form onSubmit={handleSignup} className={styles.form}>
        <label>
          Username:
          <input
            type="text"
            className = {styles.inputField}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            className = {styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>Sign Up</button>
      </form>
    </div>
  );
}