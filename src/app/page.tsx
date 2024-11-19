"use client"
import Item from "./components/Item";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "./components/Header";
import styles from "./page.module.css";
import AddItem from "./components/AddItem";

const dummyData = [
  { id: 1, title: "Black Nikes", image: "./images/black-nikes.jpg", price: "$79.99", availableSizes: "Available in all sizes" },
  { id: 2, title: "White Nikes", image: "./images/white-nikes.jpg", price: "$59.99", availableSizes: "Available in all sizes" },
  { id: 3, title: "Green Adidas", image: "./images/green-adidas.jpg", price: "$59.99", availableSizes: "Available in all sizes" },
  { id: 4, title: "White Adidas", image: "./images/white-adidas.jpg", price: "$69.99", availableSizes: "Available in all sizes" },
  { id: 5, title: "Black Timberland", image: "./images/black-timberland.jpg", price: "$49.99", availableSizes: "Available in all sizes" },
  { id: 6, title: "Brown Timberland", image: "./images/brown-timberland.jpg", price: "$49.99", availableSizes: "Available in all sizes" },
  { id: 7, title: "White Jordans", image: "./images/white-jordans.jpg", price: "$79.99", availableSizes: "Available in all sizes" },
  { id: 8, title: "Blue Jordans", image: "./images/blue-jordans.jpg", price: "$79.99", availableSizes: "Available in all sizes" },
];


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default set to logged out

  useEffect(() => {
    // Check login status on mount
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  return (
    <div className={styles.container}>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <h1 className={styles.heading}>Welcome to Our Shoe Shop!</h1>
      
      <div className={styles.itemGrid}>
        {dummyData.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>

      {/* If logged in, show 'Add New Item' link or toggle form */}
      {isLoggedIn && (
          <Link href="/add-item" className={styles.addItemLink}>
          Add New Item
        </Link>
      )}
    </div>
  );
  //comment
}