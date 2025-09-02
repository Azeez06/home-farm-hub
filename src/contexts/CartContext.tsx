import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/hooks/useProducts';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('farmlink-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('farmlink-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        const maxQuantity = product.quantity || 0;
        
        if (newQuantity > maxQuantity) {
          toast.error(`Only ${maxQuantity} items available`);
          return currentItems;
        }
        
        toast.success(`Updated ${product["product-name"]} quantity`);
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        if (quantity > (product.quantity || 0)) {
          toast.error(`Only ${product.quantity} items available`);
          return currentItems;
        }
        
        toast.success(`${product["product-name"]} added to cart`);
        return [...currentItems, { id: product.id, product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => {
      const item = currentItems.find(item => item.id === productId);
      if (item) {
        toast.success(`${item.product["product-name"]} removed from cart`);
      }
      return currentItems.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(currentItems => {
      return currentItems.map(item => {
        if (item.id === productId) {
          const maxQuantity = item.product.quantity || 0;
          if (quantity > maxQuantity) {
            toast.error(`Only ${maxQuantity} items available`);
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};