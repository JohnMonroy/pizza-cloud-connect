import { ShoppingCart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import CartItem from './CartItem';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

const CartDrawer = () => {
  const { items, total, isOpen, setIsOpen, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="bg-card border-border max-h-[85vh]">
        <DrawerHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <DrawerTitle className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Tu Pedido
            </DrawerTitle>
            <DrawerClose asChild>
              <button className="p-2 rounded-full hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground font-medium">Tu carrito está vacío</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Añade pizzas deliciosas para empezar
              </p>
            </div>
          ) : (
            items.map((item) => (
              <CartItem key={`${item.pizza.id}-${item.size}`} item={item} />
            ))
          )}
        </div>

        {items.length > 0 && (
          <DrawerFooter className="border-t border-border bg-secondary/30">
            <div className="flex justify-between items-center mb-4">
              <span className="font-display font-bold text-lg">Total:</span>
              <span className="font-display font-bold text-2xl text-primary">
                €{total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-display font-bold uppercase tracking-wide hover:bg-pizza-red-dark transition-colors"
            >
              Ir al Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full bg-muted text-muted-foreground py-3 rounded-lg font-medium hover:bg-destructive/20 hover:text-destructive transition-colors"
            >
              Vaciar Carrito
            </button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
