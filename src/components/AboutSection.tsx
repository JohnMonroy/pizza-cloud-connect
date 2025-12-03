import { Award, Users, Clock, Truck } from 'lucide-react';

const stats = [
  { icon: Award, value: '35+', label: 'Años de experiencia' },
  { icon: Users, value: '10K+', label: 'Clientes satisfechos' },
  { icon: Clock, value: '30', label: 'Min. tiempo de entrega' },
  { icon: Truck, value: '50+', label: 'Repartidores' },
];

const AboutSection = () => {
  return (
    <section id="nosotros" className="py-20 bg-pizza-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
              Nuestra Historia
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-primary-foreground mb-6 uppercase leading-tight">
              Más que Pizza,<br />
              <span className="text-accent">Una Tradición</span>
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-6 leading-relaxed">
              Desde 1985, hemos estado sirviendo las pizzas más deliciosas de la ciudad. Nuestra receta secreta y el amor por lo que hacemos nos han convertido en la pizzería favorita de miles de familias.
            </p>
            <p className="text-primary-foreground/70 mb-8 leading-relaxed">
              Cada pizza está hecha con masa fresca preparada diariamente, salsa de tomate casera y los ingredientes más frescos del mercado. Nuestro compromiso es simple: calidad sin compromisos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#menu" className="btn-primary text-center">
                Ver Menú
              </a>
              <a href="#contacto" className="btn-outline text-center">
                Contáctanos
              </a>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-pizza-dark rounded-xl p-6 text-center border border-primary-foreground/10 hover:border-primary/50 transition-colors"
              >
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="font-display text-3xl font-black text-accent mb-1">{stat.value}</p>
                <p className="text-primary-foreground/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;