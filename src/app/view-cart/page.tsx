// ViewCartPage.tsx
"use client";
import React, { useState } from "react";
import AddItem from "../components/ViewCart";
import Header from "../components/Header";
import styles from "../page.module.css";
import { cartItems, removeFromCart } from "../components/CartStore"; // Import cart items and removal logic

export default function ViewCartPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in
  const [cart, setCart] = useState(cartItems); // State to manage cart items

  // Handle deleting an item
  const handleDelete = (index: number) => {
    removeFromCart(index); // Remove from global store
    setCart([...cartItems]); // Update local state
  };

  return (
    <div className={styles.container}>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userRole={""} />
      <h1 className={styles.heading}>Items in your cart</h1>

      <div className="flex flex-col gap-4">
        {cart.map((item, index) => (
          <div key={index} className="flex items-center gap-4 border p-2 rounded">
            <img
              src={item.image}
              alt={item.title}
              className="h-16 w-16 object-cover rounded"
            />
            <div className="flex-grow">
              <h3 className="font-semibold">{item.title}</h3>
              <p>{item.price}</p>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <AddItem /> {/* Add new items */}
    </div>
  );
}
