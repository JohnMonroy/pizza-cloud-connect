import { ChevronDown, Truck, Clock, Star } from 'lucide-react';

interface HeroProps {
  heroImage: string;
}

const Hero = ({ heroImage }: HeroProps) => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pizza-black"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-primary" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold text-sm uppercase tracking-wide">Oferta Especial</span>
          </div>
          
          <h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-primary-foreground mb-6 opacity-0 animate-fade-in uppercase leading-tight"
            style={{ animationDelay: '0.4s' }}
          >
            <span className="text-accent">2x1</span> en Pizzas
            <br />
            <span className="text-primary">Todos los Martes</span>
          </h1>
          
          <p 
            className="font-body text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            Las mejores pizzas de la ciudad, hechas con ingredientes frescos y entregadas calientes a tu puerta
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.8s' }}
          >
            <a href="#menu" className="btn-primary animate-pulse-glow">
              Pedir Ahora
            </a>
            <a href="#menu" className="btn-outline">
              Ver Menú
            </a>
          </div>

          {/* Features */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '1s' }}
          >
            <div className="flex items-center justify-center gap-3 text-primary-foreground/80">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-bold text-primary-foreground">Envío Gratis</p>
                <p className="text-sm text-primary-foreground/60">Pedidos +20€</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-primary-foreground/80">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-bold text-primary-foreground">30 Minutos</p>
                <p className="text-sm text-primary-foreground/60">O es gratis</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-primary-foreground/80">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-bold text-primary-foreground">+10,000</p>
                <p className="text-sm text-primary-foreground/60">Clientes felices</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#menu" className="text-primary-foreground/60 hover:text-primary transition-colors">
          <ChevronDown size={40} />
        </a>
      </div>
    </section>
  );
};

export default Hero;