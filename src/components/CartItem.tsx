import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType, useCart } from '@/contexts/CartContext';

const SIZE_LABELS = {
  small: 'Pequeña',
  medium: 'Mediana',
  large: 'Grande',
};

const SIZE_MULTIPLIERS = {
  small: 0.8,
  medium: 1,
  large: 1.3,
};

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const itemPrice = item.pizza.price * SIZE_MULTIPLIERS[item.size];

  return (
    <div className="flex gap-3 p-3 bg-secondary/50 rounded-lg">
      <img
        src={item.image}
        alt={item.pizza.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-bold text-foreground text-sm truncate">
          {item.pizza.name}
        </h4>
        <p className="text-xs text-muted-foreground">{SIZE_LABELS[item.size]}</p>
        <p className="text-sm font-bold text-primary mt-1">
          €{(itemPrice * item.quantity).toFixed(2)}
        </p>
        
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.pizza.id, item.size, item.quantity - 1)}
            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="font-bold text-sm w-6 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.pizza.id, item.size, item.quantity + 1)}
            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
          <button
            onClick={() => removeItem(item.pizza.id, item.size)}
            className="ml-auto w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
