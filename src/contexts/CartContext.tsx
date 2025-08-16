import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Kitten } from '@/types/kitten';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (kitten: Kitten) => void;
  removeFromCart: (kittenId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (kitten: Kitten) => {
    console.log('Adding kitten to cart:', kitten.name);
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.kitten.id === kitten.id);
      if (existingItem) {
        toast({
          title: "¡Ya tienes este gatito!",
          description: `${kitten.name} ya está en tu carrito.`,
        });
        return prevItems;
      }
      
      toast({
        title: "¡Gatito agregado!",
        description: `${kitten.name} ha sido agregado a tu carrito.`,
      });
      
      return [...prevItems, { kitten, quantity: 1 }];
    });
  };

  const removeFromCart = (kittenId: string) => {
    console.log('Removing kitten from cart:', kittenId);
    setItems(prevItems => {
      const item = prevItems.find(item => item.kitten.id === kittenId);
      if (item) {
        toast({
          title: "Gatito removido",
          description: `${item.kitten.name} ha sido removido del carrito.`,
        });
      }
      return prevItems.filter(item => item.kitten.id !== kittenId);
    });
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setItems([]);
    toast({
      title: "Carrito vaciado",
      description: "Todos los gatitos han sido removidos del carrito.",
    });
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.kitten.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalPrice,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};