"use client";
import AddItem from "../components/AddItem";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import API from "../config/config";

interface NewItemData {
  title: string;
  image: string;
  price: string;
  availableSizes: string;
}

export default function AddItemPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState("customer");
  const router = useRouter();

  useEffect(() => {
    // Get user role from localStorage
    const storedRole = localStorage.getItem("userRole");

    // Check if the role is valid (i.e., admin)
    if (storedRole === "admin") {
      setUserRole("admin");
    } else {
      setUserRole("customer");
    }

    // If the role is not admin, redirect to the home page
    if (storedRole !== "admin") {
      router.push("/");
    }
  }, [router,userRole]);

  const handleAddItem = async (newItem: NewItemData) => {
    try {
      const response = await fetch(`${API}/items/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        // Redirect to home page or items list after successful addition
        router.push("/");
      } else {
        // Handle error case
        console.error("Error adding item");
        alert("Failed to add item. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the item.");
    }
  };

  return (
    <div className={styles.container}>
      <Header 
        isLoggedIn={isLoggedIn} 
        userRole="admin" 
        setIsLoggedIn={setIsLoggedIn} 
      />
      <h1 className={styles.heading}>Add New Item (Admin Only)</h1>
      <AddItem onSave={handleAddItem} />
    </div>
  );
}