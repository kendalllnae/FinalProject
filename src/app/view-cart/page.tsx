"use client";
import AddItem from "../components/ViewCart";
import Header from "../components/Header";
import { useState } from "react";
import styles from "../page.module.css"; // Reuse existing styles or create a new file

export default function ViewCartPage() {
  // Set up the login state if necessary (for demonstration purposes)
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in for this page

  return (
    <div className={styles.container}>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <h1 className={styles.heading}>Items in your cart</h1>
      <AddItem /> {/* Render the AddItem component */}
    </div>
  );
}