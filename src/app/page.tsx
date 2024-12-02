// page.tsx
"use client";
import Item from "./components/Item";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "./components/Header";
import styles from "./page.module.css";
import AddItem from "./components/AddItem";
import API from "./config/config";

interface Product {
  id: string;
  title: string;
  image: string;
  price: string;
  availableSizes: string;
}

interface NewItemData {
  title: string;
  image: string;
  price: string;
  availableSizes: string;
}

const fetchItems = async () => {
  const response = await fetch(`${API}/items`);
  const data = await response.json();
  return data;
};

export default function Home() {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("customer");

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(loginStatus === "true");
    setUserRole(role || "customer");

    const getItems = async () => {
      const itemsFromBackend = await fetchItems();
      setItems(itemsFromBackend);
    };

    getItems();
  }, []);

  const handleAddItem = async (newItem: NewItemData) => {
    try {
      const response = await fetch(`${API}/items/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const savedItem = await response.json();
        setItems((prevItems) => [...prevItems, savedItem]);
      } else {
        console.error("Error adding item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditItem = async (updatedItem: Product) => {
    const response = await fetch(`${API}/items/${updatedItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });

    if (response.ok) {
      const editedItem = await response.json();
      setItems(
        items.map((item) => (item.id === updatedItem.id ? editedItem : item))
      );
    } else {
      console.error("Error editing item");
    }
  };

  const handleDeleteItem = async (id: string) => {
    const response = await fetch(`${API}/items/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setItems(items.filter((item) => item.id !== id));
    } else {
      console.error("Error deleting item");
    }
  };

  return (
    <div className={styles.container}>
      <Header
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        setIsLoggedIn={setIsLoggedIn}
      />
      <h1 className={styles.heading}>Welcome to Our Shoe Shop!</h1>

      <div className={styles.itemGrid}>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onEdit={userRole === "admin" ? handleEditItem : undefined}
            onDelete={userRole === "admin" ? handleDeleteItem : undefined}
            isAdmin={userRole === "admin"}
          />
        ))}
      </div>

      {isLoggedIn && userRole === "admin" && (
        <>
          <AddItem 
            onSave={handleAddItem}  // Explicitly pass the function here
          />
          <Link href="/add-item" className={styles.addItemLink}>
            Add New Item
          </Link>
        </>
      )}
    </div>
  );
}