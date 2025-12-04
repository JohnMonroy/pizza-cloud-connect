import { Pizza } from '@/types/pizza';
import { Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface PizzaCardProps {
  pizza: Pizza;
  image: string;
}

const PizzaCard = ({ pizza, image }: PizzaCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(pizza, image, 'medium');
  };

  return (
    <div className="pizza-card group bg-card">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={image}
          alt={pizza.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {pizza.isPopular && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-bold uppercase tracking-wide">
            Popular
          </span>
        )}
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded text-sm font-bold">
          €{pizza.price.toFixed(2)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-foreground mb-2 uppercase">
          {pizza.name}
        </h3>

        <p className="font-body text-muted-foreground text-sm mb-4 line-clamp-2">
          {pizza.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {pizza.ingredients.slice(0, 4).map((ingredient) => (
            <span
              key={ingredient}
              className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded"
            >
              {ingredient}
            </span>
          ))}
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-bold uppercase text-sm tracking-wide transition-all duration-300 hover:bg-pizza-red-dark"
        >
          <Plus className="w-5 h-5" />
          Añadir
        </button>
      </div>
    </div>
  );
};

export default PizzaCard;
