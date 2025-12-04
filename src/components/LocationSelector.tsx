import { useState } from 'react';
import { Search, Navigation, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AddressMap from './AddressMap';

interface LocationSelectorProps {
  onLocationSelect?: (address: string) => void;
  onLocationConfirmed?: (address: string) => void;
}

interface GeocodedLocation {
  lat: number;
  lng: number;
  address: string;
}

const LocationSelector = ({ onLocationSelect, onLocationConfirmed }: LocationSelectorProps) => {
  const [address, setAddress] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [geocodedLocation, setGeocodedLocation] = useState<GeocodedLocation | null>(null);
  const [showMap, setShowMap] = useState(false);
  const { toast } = useToast();

  const geocodeAddress = async (searchAddress: string): Promise<GeocodedLocation | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          address: data[0].display_name,
        };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  const handleSearch = async () => {
    if (!address.trim()) return;
    
    setIsSearching(true);
    const location = await geocodeAddress(address);
    setIsSearching(false);
    
    if (location) {
      setGeocodedLocation(location);
      setShowMap(true);
      onLocationSelect?.(location.address);
    } else {
      toast({
        title: 'Dirección no encontrada',
        description: 'No pudimos encontrar esa dirección. Intenta con otra.',
        variant: 'destructive',
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
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          const data = await response.json();
          
          const displayAddress = data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          
          setGeocodedLocation({
            lat: latitude,
            lng: longitude,
            address: displayAddress,
          });
          setAddress(displayAddress);
          setShowMap(true);
          onLocationSelect?.(displayAddress);
          
          toast({
            title: '¡Ubicación encontrada!',
            description: 'Confirma tu ubicación en el mapa',
          });
        } catch (error) {
          const coordsAddress = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setGeocodedLocation({
            lat: latitude,
            lng: longitude,
            address: coordsAddress,
          });
          setAddress(coordsAddress);
          setShowMap(true);
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

  const handleMapConfirm = (lat: number, lng: number, confirmedAddress: string) => {
    setShowMap(false);
    setAddress(confirmedAddress);
    onLocationConfirmed?.(confirmedAddress);
    toast({
      title: '¡Dirección confirmada!',
      description: 'Ya puedes agregar productos al carrito',
    });
  };

  const handleMapCancel = () => {
    setShowMap(false);
    setGeocodedLocation(null);
  };

  if (showMap && geocodedLocation) {
    return (
      <AddressMap
        latitude={geocodedLocation.lat}
        longitude={geocodedLocation.lng}
        address={geocodedLocation.address}
        onConfirm={handleMapConfirm}
        onCancel={handleMapCancel}
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
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
          disabled={isSearching}
          className="h-14 px-6 bg-primary hover:bg-pizza-red-dark text-primary-foreground font-bold rounded-lg"
        >
          {isSearching ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Buscar
            </>
          )}
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
