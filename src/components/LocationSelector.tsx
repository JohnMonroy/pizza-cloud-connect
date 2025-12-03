import { useState } from 'react';
import { MapPin, Search, AlertCircle, Navigation, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LocationSelectorProps {
  onLocationSelect?: (address: string) => void;
}

const LocationSelector = ({ onLocationSelect }: LocationSelectorProps) => {
  const [address, setAddress] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (address.trim()) {
      onLocationSelect?.(address);
      toast({
        title: '¡Dirección guardada!',
        description: `Entregaremos a: ${address}`,
      });
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Error',
        description: 'Tu navegador no soporta geolocalización',
        variant: 'destructive',
      });
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use reverse geocoding to get address from coordinates
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          const data = await response.json();
          
          const displayAddress = data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setAddress(displayAddress);
          onLocationSelect?.(displayAddress);
          
          toast({
            title: '¡Ubicación encontrada!',
            description: 'Hemos detectado tu ubicación actual',
          });
        } catch (error) {
          // Fallback to coordinates if reverse geocoding fails
          const coordsAddress = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setAddress(coordsAddress);
          onLocationSelect?.(coordsAddress);
        }
        
        setIsLoadingLocation(false);
      },
      (error) => {
        setIsLoadingLocation(false);
        let errorMessage = 'No pudimos obtener tu ubicación';
        
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = 'Debes permitir el acceso a tu ubicación';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = 'Información de ubicación no disponible';
        } else if (error.code === error.TIMEOUT) {
          errorMessage = 'Tiempo de espera agotado';
        }
        
        toast({
          title: 'Error de ubicación',
          description: errorMessage,
          variant: 'destructive',
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Alert Banner */}
      <div className="bg-accent text-accent-foreground rounded-lg p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-bold text-sm">Por favor proporcione su dirección</p>
          <p className="text-sm opacity-90">Busque y seleccione una dirección en el menú desplegable</p>
        </div>
      </div>

      {/* Address Input */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Su dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="h-14 pl-4 pr-4 text-base bg-background border-2 border-muted focus:border-primary rounded-lg"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          onClick={handleSearch}
          className="h-14 px-6 bg-primary hover:bg-pizza-red-dark text-primary-foreground font-bold rounded-lg"
        >
          <Search className="w-5 h-5 mr-2" />
          Buscar
        </Button>
      </div>

      {/* Use My Location Button */}
      <button
        onClick={handleUseMyLocation}
        disabled={isLoadingLocation}
        className="flex items-center justify-center gap-2 mx-auto text-primary hover:text-pizza-red-dark font-semibold transition-colors disabled:opacity-50"
      >
        {isLoadingLocation ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Navigation className="w-5 h-5" />
        )}
        <span className="underline underline-offset-2">
          {isLoadingLocation ? 'Obteniendo ubicación...' : 'Utilizar Mi Ubicación'}
        </span>
      </button>
    </div>
  );
};

export default LocationSelector;
