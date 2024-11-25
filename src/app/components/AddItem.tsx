import { useState } from "react";
import React from "react";

interface Item {
  title: string;
  image: string;
  price: string;
  availability: string;
}

export default function AddItem() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("Available in all sizes");
  const [error, setError] = useState("");
  const [items, setItems] = useState<Item[]>([]); // State for storing items

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation to check if fields are filled
    if (!title || !image || !price) {
      setError("All fields must be filled!");
      return;
    }

    // Create a new item object
    const newItem = { title, image, price, availability };

    // Update the items state
    setItems((prevItems) => [...prevItems, newItem]);

    // Reset the fields
    setTitle("");
    setImage("");
    setPrice("");
    setAvailability("Available in all sizes");
    setError(""); // Clear error message if submission is successful
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 max-w-md mx-auto border border-gray-300 rounded-lg shadow-md"
      >
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

      {/* Display the added items */}
      <div className="mt-8 p-4">
        <h3 className="text-lg font-semibold mb-4">Added Items</h3>
        <ul className="flex flex-col gap-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.price}</p>
                <p className="text-sm text-gray-500">{item.availability}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
