// cartStore.tsx

// Define the type for cart items
export interface CartItem {
    title: string;
    price: string;
    image: string;
  }
  
  // Initialize the global cart items array
  export const cartItems: CartItem[] = [];
  
  /**
   * Add a new item to the cart.
   * @param item - The item to be added.
   */
  export function addToCart(item: CartItem): void {
    cartItems.push(item);
  }
  
  /**
   * Remove an item from the cart by its index.
   * @param index - The index of the item to remove.
   */
  export function removeFromCart(index: number): void {
    if (index >= 0 && index < cartItems.length) {
      cartItems.splice(index, 1);
    }
  }
  
  /**
   * Get the current cart items.
   * This can be useful if you need to fetch the cart items without directly accessing the array.
   * @returns A copy of the cart items.
   */
  export function getCartItems(): CartItem[] {
    return [...cartItems]; // Return a copy to avoid direct mutation
  }
  