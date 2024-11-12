import React from 'react';

interface ItemProps {
  item: { id: number; title: string; image: string; price: string; availableSizes: string };
}

export default function Item({ item }: ItemProps) {
  return (
    <div className="p-4 border rounded-md text-center shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <img 
        src={item.image} 
        alt={item.title} 
        className="h-32 w-32 object-cover mx-auto rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
      <p className="text-gray-600">{item.price}</p>
      <p className="text-sm text-green-600">{item.availableSizes}</p>
    </div>
  );
}