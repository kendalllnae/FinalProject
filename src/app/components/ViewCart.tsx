import React from 'react';
import { cartItems } from './CartStore'; // Import the cart items

export default function ViewCart() {
  if (cartItems.length === 0) {
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  // Calculate the total price of the cart items
  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);

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
    </div>
    //comment
  );
}
