import React from 'react';
import { cartItems } from './CartStore'; // Import the cart items


interface ItemProps {
  item: { id: number; title: string; image: string; price: string; availableSizes: string };
}


export default function Item({ item }: ItemProps) {

 // Add item to the cartItems array and show an alert on button click
 const handleBuyClick = () => {
  // Add item details (including image) to the cart (global constant)
  cartItems.push({ title: item.title, price: item.price, image: item.image });

  // Show the alert with the item details
  alert(`${item.title} added to cart! Price: ${item.price}`);

  // Log the cart items to the console (just to verify)
  console.log(cartItems);
};


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

        {/* Buy Button */}
        <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //onClick={() => alert(`Item ${item.title} added to cart`)} 

        onClick={handleBuyClick}
      >
        Buy
      </button>
    </div>
  );
}