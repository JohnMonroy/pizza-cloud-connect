import { ChevronDown, Truck, Clock, Star, MapPin, CheckCircle } from 'lucide-react';
import LocationSelector from './LocationSelector';
import { useDelivery } from '@/contexts/DeliveryContext';
import { Button } from './ui/button';

interface HeroProps {
  heroImage: string;
}

const Hero = ({ heroImage }: HeroProps) => {
  const { address, isLocationConfirmed, setDeliveryAddress, clearAddress } = useDelivery();

  const handleLocationSelect = (selectedAddress: string) => {
    console.log('Dirección seleccionada:', selectedAddress);
  };

  const handleLocationConfirmed = (confirmedAddress: string) => {
    setDeliveryAddress(confirmedAddress);
    // Scroll to menu section after confirming
    setTimeout(() => {
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

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
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold text-sm uppercase tracking-wide">Bienvenidos a Pizza Hut</span>
          </div>
          
          {isLocationConfirmed ? (
            // Show confirmed location
            <>
              <h1 
                className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-4 opacity-0 animate-fade-in uppercase leading-tight"
                style={{ animationDelay: '0.4s' }}
              >
                ¡Listo para ordenar!
              </h1>
              
              <div 
                className="bg-card/90 backdrop-blur-sm rounded-xl p-6 max-w-xl mx-auto mb-8 opacity-0 animate-fade-in"
                style={{ animationDelay: '0.6s' }}
              >
                <div className="flex items-center justify-center gap-2 text-green-500 mb-3">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-bold">Ubicación confirmada</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                  <p className="text-sm text-left">{address}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAddress}
                  className="mt-4"
                >
                  Cambiar dirección
                </Button>
              </div>

              <a
                href="#menu"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all opacity-0 animate-fade-in"
                style={{ animationDelay: '0.8s' }}
              >
                Ver Menú
                <ChevronDown className="w-5 h-5" />
              </a>
            </>
          ) : (
            // Show location selector
            <>
              <h1 
                className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-4 opacity-0 animate-fade-in uppercase leading-tight"
                style={{ animationDelay: '0.4s' }}
              >
                Ingrese su dirección
              </h1>
              
              <p 
                className="font-body text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in"
                style={{ animationDelay: '0.6s' }}
              >
                Para ver el menú local y las ofertas disponibles en su zona
              </p>

              {/* Location Selector */}
              <div 
                className="opacity-0 animate-fade-in mb-12"
                style={{ animationDelay: '0.8s' }}
              >
                <LocationSelector 
                  onLocationSelect={handleLocationSelect}
                  onLocationConfirmed={handleLocationConfirmed}
                />
              </div>
            </>
          )}

          {/* Features */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0 animate-fade-in mt-8"
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
      {isLocationConfirmed && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#menu" className="text-primary-foreground/60 hover:text-primary transition-colors">
            <ChevronDown size={40} />
          </a>
        </div>
      )}
    </section>
  );
};

export default Hero;
