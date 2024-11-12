import { useState } from "react";
import React from 'react';

export default function AddItem() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("Available in all sizes");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation to check if fields are filled
    if (!title || !image || !price) {
      setError("All fields must be filled!");
      return;
    }

    console.log({ title, image, price, availability });
    
    // Reset the fields
    setTitle("");
    setImage("");
    setPrice("");
    setAvailability("Available in all sizes");
    setError(""); // Clear error message if submission is successful
  };

  // Handle change in input fields
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };
  const handleAvailableSizesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvailability(e.target.value);
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-md mx-auto border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add a New Item</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>} {/* Error message */}
      
      <label className="text-sm font-medium">Title</label>
      <input 
        type="text"
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className="p-2 border border-gray-300 rounded"
        placeholder="Enter item title"
      />

      <label className="text-sm font-medium">Image URL</label>
      <input 
        type="text" 
        value={image} 
        onChange={(e) => setImage(e.target.value)} 
        className="p-2 border border-gray-300 rounded"
        placeholder="Enter image URL"
      />

      <label className="text-sm font-medium">Price</label>
      <input 
        type="text" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        className="p-2 border border-gray-300 rounded"
        placeholder="Enter item price"
      />

      <label className="text-sm font-medium">Availability</label>
      <input 
        type="text" 
        value={availability} 
        onChange={(e) => setAvailability(e.target.value)} 
        className="p-2 border border-gray-300 rounded"
        placeholder="Enter availability (default: Available in all sizes)"
      />

      <button 
        type="submit" 
        className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition-colors"
      >
        Add Item
      </button>
    </form>
  );
}