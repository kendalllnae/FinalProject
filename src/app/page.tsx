// page.tsx
"use client";
import Item from "./components/Item";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "./components/Header";
import styles from "./page.module.css";
import AddItem from "./components/AddItem";
import API from "./config/config";
import EditItemForm from "./components/EditForm";

interface Product {
  _id: string;
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
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEditButtonClick = (item: Product) => {
    console.log("Editing item:", item);
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleSaveEdit = async (updatedItem: Product) => {
    try {
      const response = await fetch(`${API}/items/${updatedItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        const editedItem = await response.json();
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedItem._id ? editedItem : item
          )
        );
        setIsEditing(false);
        setEditingItem(null);
      } else {
        console.error("Error saving changes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    const response = await fetch(`${API}/items/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setItems(items.filter((item) => item._id !== id));
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
            key={item._id}
            item={item}
            onEdit={userRole === "admin" ? handleEditButtonClick : undefined}
            onDelete={userRole === "admin" ? handleDeleteItem : undefined}
            isAdmin={userRole === "admin"}
          />
        ))}
      </div>

      {isLoggedIn && userRole === "admin" && (
        <>
          <AddItem
            onSave={handleAddItem} // Explicitly pass the function here
          />
          <Link href="/add-item" className={styles.addItemLink}>
            Add New Item
          </Link>
        </>
      )}
      {isEditing && editingItem && (
        <EditItemForm
          item={editingItem}
          onSave={handleSaveEdit}
          onCancel={() => {
            setIsEditing(false);
            setEditingItem(null);
          }}
        />
      )}
      
    </div>
  );
}
