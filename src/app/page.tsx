"use client";
import Item from "./components/Item";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "./components/Header";
import styles from "./page.module.css";
import AddItem from "./components/AddItem";

const dummyData = [
  { id: 1, title: "Black Nikes", image: "./images/black-nikes.jpg", price: "$79.99", availableSizes: "Men 10" },
  { id: 2, title: "White Nikes", image: "./images/white-nikes.jpg", price: "$59.99", availableSizes: "Women 8" },
  { id: 3, title: "Green Adidas", image: "./images/green-adidas.jpg", price: "$59.99", availableSizes: "Women 7" },
  { id: 4, title: "White Adidas", image: "./images/white-adidas.jpg", price: "$69.99", availableSizes: "Women 6" },
  { id: 5, title: "Black Timberland", image: "./images/black-timberland.jpg", price: "$49.99", availableSizes: "Kids 12" },
  { id: 6, title: "Brown Timberland", image: "./images/brown-timberland.jpg", price: "$49.99", availableSizes: "Men 9" },
  { id: 7, title: "White Jordans", image: "./images/white-jordans.jpg", price: "$79.99", availableSizes: "Men 12" },
  { id: 8, title: "Blue Jordans", image: "./images/blue-jordans.jpg", price: "$79.99", availableSizes: "Men 10" },
];

export default function Home() {
  const [items, setItems] = useState(dummyData);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default set to logged out
  const [userRole, setUserRole] = useState(""); // Default set to customer

  useEffect(() => {
    // Check login status on mount
    const loginStatus = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(loginStatus === "true");
    setUserRole(role || "customer");
  }, []);

  // Function to handle adding a new item
  const handleAddItem = (newItem: { title: string; image: string; price: string; availableSizes: string }) => {
    setItems([...items, { ...newItem, id: Date.now() }]); // Add with a unique ID
  };

  // Function to handle editing an item
  const handleEditItem = (updatedItem: { id: number; title: string; image: string; price: string; availableSizes: string }) => {
    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  // Function to handle deleting an item
  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.container}>
      <Header isLoggedIn={isLoggedIn} userRole={userRole} setIsLoggedIn={setIsLoggedIn} />
      <h1 className={styles.heading}>Welcome to Our Shoe Shop! </h1>

      <div className={styles.itemGrid}>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onEdit={userRole === "admin" ? handleEditItem : () => {}} // Only admins can edit
            onDelete={userRole === "admin" ? handleDeleteItem : () => {}} // Only admins can delete
          />
        ))}
      </div>

      {isLoggedIn && userRole === "admin" && (
        <>
          <AddItem onSave={handleAddItem} />
          <Link href="/add-item" className={styles.addItemLink}>
            Add New Item
          </Link>
        </>
      )}
    </div>
  );
}
