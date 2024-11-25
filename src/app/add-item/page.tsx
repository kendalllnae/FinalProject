"use client";
import AddItem from "../components/AddItem";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";

export default function AddItemPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in for this page
  const [userRole, setUserRole] = useState("customer"); // Default to 'customer' role
  const router = useRouter();

  useEffect(() => {
    // Get user role from localStorage
    const storedRole = localStorage.getItem("userRole");

    // Check if the role is valid (i.e., admin)
    if (storedRole === "admin") {
      setUserRole("admin"); // Set role to admin if found
    } else {
      setUserRole("customer"); // Default role
    }

    // If the role is not admin, redirect to the home page
    if (storedRole !== "admin") {
      router.push("/"); // Redirect to home for non-admins
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Header isLoggedIn={isLoggedIn} userRole="admin" setIsLoggedIn={setIsLoggedIn} />
      <h1 className={styles.heading}>Add New Item (Admin Only)</h1>
      <AddItem /> {/* Render the AddItem component */}
    </div>
  );
}




