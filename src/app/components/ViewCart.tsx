import React, { useState } from 'react';
import { cartItems } from './CartStore'; // Import the cart items

export default function ViewCart() {
  const [showMessage, setShowMessage] = useState(false); // State for showing the popup

  if (cartItems.length === 0) {
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  // Calculate the total price of the cart items
  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);

  // Function to handle checkout
  const handleCheckout = () => {
    setShowMessage(true); // Show the thank-you message
    setTimeout(() => setShowMessage(false), 3000); // Hide it after 3 seconds
  };

  return (
    <div className="p-4">
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b text-left">Image</th>
            <th className="px-4 py-2 border-b text-left">Title</th>
            <th className="px-4 py-2 border-b text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">
                <img src={item.image} alt={item.title} className="h-16 w-16 object-cover rounded-md" />
              </td>
              <td className="px-4 py-2">{item.title}</td>
              <td className="px-4 py-2">{item.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100">
            <td colSpan={2} className="px-4 py-2 text-right font-semibold">Total:</td>
            <td className="px-4 py-2 font-semibold">{`$${totalPrice.toFixed(2)}`}</td>
          </tr>
        </tfoot>
      </table>

      <div className="mt-4 text-center">
        <button
          onClick={handleCheckout}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
        >
          Checkout
        </button>
      </div>

      {showMessage && (
        <div className="mt-4 text-center">
          <p className="bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-md">
            Thank you for shopping!
          </p>
        </div>
      )}
    </div>
  );
}
