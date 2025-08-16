import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Kitten, CartItem } from '@/types/kitten';

interface CartContextType {
  items: CartItem[];
  addItem: (kitten: Kitten) => void;
  removeItem: (kittenId: number) => void;
  updateQuantity: (kittenId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  console.log('CartProvider rendered, items count:', items.length);

  const addItem = (kitten: Kitten) => {
    console.log('Adding item to cart:', kitten.name);
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.kitten.id === kitten.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.kitten.id === kitten.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { kitten, quantity: 1 }];
    });
  };

  const removeItem = (kittenId: number) => {
    console.log('Removing item from cart:', kittenId);
    setItems(prevItems => prevItems.filter(item => item.kitten.id !== kittenId));
  };

  const updateQuantity = (kittenId: number, quantity: number) => {
    console.log('Updating quantity for item:', kittenId, 'to:', quantity);
    if (quantity <= 0) {
      removeItem(kittenId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.kitten.id === kittenId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.kitten.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};