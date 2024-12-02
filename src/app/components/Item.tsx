"use client";
import React from "react";
import { addToCart } from "./CartStore";

interface ItemProps {
  item: {
    id: string;
    title: string;
    image: string;
    price: string;
    availableSizes: string;
  };
  onEdit?: (item: {
    id: string;
    title: string;
    image: string;
    price: string;
    availableSizes: string;
  }) => void;
  onDelete?: (id: string) => void;
  isAdmin: boolean;
}

export default function Item({
  item,
  onEdit = () => {}, // Default no-op function
  onDelete = () => {}, // Default no-op function
  isAdmin,
}: ItemProps) {
  const handleEditClick = () => {
    if (isAdmin && onEdit) {
      onEdit(item);
    }
  };

  const handleDeleteClick = () => {
    if (isAdmin && onDelete) {
      if (confirm("Are you sure you want to delete this item?")) {
        onDelete(item.id);
      }
    }
  };

  const handleBuyClick = () => {
    alert(`You have purchased ${item.title} for ${item.price}!`);
  };

  return (
    <div className="p-4 border rounded-md text-center shadow-md">
      <img
        src={item.image}
        alt={item.title}
        className="h-32 w-32 object-cover mx-auto rounded-md"
        width={128}
        height={128}
      />
      <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
      <p className="text-gray-600">{item.price}</p>
      <p className="text-sm text-green-600">{item.availableSizes}</p>

      <div className="flex justify-center gap-4 mt-4">
        {!isAdmin && (
          <>
            <button
              onClick={() => {
                addToCart({
                  title: item.title,
                  price: item.price,
                  image: item.image,
                });
                alert(`${item.title} has been added to your cart!`);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Cart
            </button>
          </>
        )}

        {isAdmin && (
          <>
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
