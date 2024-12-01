"use client";
import React, { useState, useEffect } from "react";

export default function AddItem({ item, onSave }: { item?: any; onSave: (item: any) => void }) {
  const [formData, setFormData] = useState({
    id: item?.id || null,
    title: item?.title || "",
    image: item?.image || "",
    price: item?.price || "",
    availableSizes: item?.availableSizes || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-semibold mb-4">{item ? "Edit Item" : "Add New Item"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Available Sizes</label>
          <input
            type="text"
            name="availableSizes"
            value={formData.availableSizes}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
