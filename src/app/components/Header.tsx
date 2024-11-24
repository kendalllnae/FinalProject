import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import React from "react";

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ isLoggedIn, setIsLoggedIn }: HeaderProps) {
  const router = useRouter();

  useEffect(() => {
    // Check local storage for login status
    const loginStatus = localStorage.getItem("isLoggedIn");
    
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Clear login status
    router.push("/"); // Redirect to the home page
  };

  return (
    <header className={styles.header}>
      {/* Logo on the left */}
      <div className={styles.logoSection}>
        <img src="./images/logo.jpg" alt="Logo" className={styles.logo} />
        <h1 className="text-xl font-bold">Aldenaire Shoe Shop</h1>
      </div>

      {/* Navigation Links on the right */}
      <nav className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>Home</Link>
        {isLoggedIn ? (
          <>
            <Link href="/add-item" className={styles.navLink}>Add Item</Link>
            <Link href="/view-cart" className={styles.navLink}>View Cart</Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.navLink}>Login</Link>
            <Link href="/signup" className={styles.navLink}>Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}