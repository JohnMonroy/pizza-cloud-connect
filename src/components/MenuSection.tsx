import { useState } from 'react';
import { pizzas } from '@/data/pizzas';
import PizzaCard from './PizzaCard';
import { useDelivery } from '@/contexts/DeliveryContext';
import { MapPin, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

interface MenuSectionProps {
  pizzaImages: Record<string, string>;
}

const categories = [
  { id: 'all', label: 'Todas' },
  { id: 'classica', label: 'Clásicas' },
  { id: 'speciale', label: 'Especiales' },
  { id: 'vegetariana', label: 'Vegetarianas' },
];

const MenuSection = ({ pizzaImages }: MenuSectionProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { isLocationConfirmed } = useDelivery();

  const filteredPizzas = activeCategory === 'all'
    ? pizzas
    : pizzas.filter((pizza) => pizza.category === activeCategory);

  const scrollToTop = () => {
    const heroSection = document.getElementById('inicio');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="menu" className="py-20 bg-cream relative">
      {/* Overlay when location not confirmed */}
      {!isLocationConfirmed && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">
              Primero confirma tu ubicación
            </h3>
            <p className="text-muted-foreground mb-6">
              Para ver el menú y hacer tu pedido, necesitamos saber dónde entregaremos tu pizza
            </p>
            <Button onClick={scrollToTop} className="gap-2">
              <ArrowUp className="w-4 h-4" />
              Ingresar dirección
            </Button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
            Nuestro Menú
          </span>
          <h2 className="section-title text-pizza-black">Elige tu Favorita</h2>
          <p className="section-subtitle">
            Pizzas artesanales con los mejores ingredientes, preparadas al momento
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              disabled={!isLocationConfirmed}
              className={`px-6 py-3 rounded-lg font-display font-bold uppercase text-sm tracking-wide transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card text-foreground border border-border hover:border-primary hover:text-primary'
              } ${!isLocationConfirmed ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Pizza Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPizzas.map((pizza, index) => (
            <div
              key={pizza.id}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PizzaCard 
                pizza={pizza} 
                image={pizzaImages[pizza.id] || '/placeholder.svg'}
                disabled={!isLocationConfirmed}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
