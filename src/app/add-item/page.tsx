"use client";
import AddItem from "../components/AddItem";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";

export default function AddItemPage() {
  // Set up the login state if necessary (for demonstration purposes)
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in for this page
  const [userRole, setUserRole] = useState("customer");

  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      router.push("/"); // Redirect non-admin users to the home page
    }
  }, []);

  return (
    <div className={styles.container}>
      <Header isLoggedIn={isLoggedIn} userRole="admin" setIsLoggedIn={setIsLoggedIn} />
      <h1 className={styles.heading}>Add New Item (Admin Only)</h1>
      <AddItem /> {/* Render the AddItem component */}
    </div>
  );
}