import { createContext, useContext, useState, ReactNode } from 'react';
import { Pizza } from '@/types/pizza';

export interface CartItem {
  pizza: Pizza;
  quantity: number;
  size: 'small' | 'medium' | 'large';
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (pizza: Pizza, image: string, size?: 'small' | 'medium' | 'large') => void;
  removeItem: (pizzaId: string, size: string) => void;
  updateQuantity: (pizzaId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const SIZE_MULTIPLIERS = {
  small: 0.8,
  medium: 1,
  large: 1.3,
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (pizza: Pizza, image: string, size: 'small' | 'medium' | 'large' = 'medium') => {
    setItems((prev) => {
      const existing = prev.find((item) => item.pizza.id === pizza.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.pizza.id === pizza.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { pizza, quantity: 1, size, image }];
    });
    setIsOpen(true);
  };

  const removeItem = (pizzaId: string, size: string) => {
    setItems((prev) => prev.filter((item) => !(item.pizza.id === pizzaId && item.size === size)));
  };

  const updateQuantity = (pizzaId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(pizzaId, size);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.pizza.id === pizzaId && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce(
    (sum, item) => sum + item.pizza.price * SIZE_MULTIPLIERS[item.size] * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
