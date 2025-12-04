import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Button } from '@/components/ui/button';
import { Check, X, MapPin } from 'lucide-react';

interface AddressMapProps {
  latitude: number;
  longitude: number;
  address: string;
  onConfirm: (lat: number, lng: number, address: string) => void;
  onCancel: () => void;
}

const MAPTILER_API_KEY = '0Cy3BP0uW9f8TmQ2foSC';

const AddressMap = ({ latitude, longitude, address, onConfirm, onCancel }: AddressMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const marker = useRef<maplibregl.Marker | null>(null);
  const [currentCoords, setCurrentCoords] = useState({ lat: latitude, lng: longitude });
  const [currentAddress, setCurrentAddress] = useState(address);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`,
      center: [longitude, latitude],
      zoom: 16,
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Create draggable marker
    marker.current = new maplibregl.Marker({
      color: '#E63946',
      draggable: true,
    })
      .setLngLat([longitude, latitude])
      .addTo(map.current);

    // Handle marker drag
    marker.current.on('dragend', async () => {
      if (!marker.current) return;
      const lngLat = marker.current.getLngLat();
      setCurrentCoords({ lat: lngLat.lat, lng: lngLat.lng });
      
      // Reverse geocode the new position
      setIsLoadingAddress(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lngLat.lat}&lon=${lngLat.lng}&addressdetails=1`
        );
        const data = await response.json();
        if (data.display_name) {
          setCurrentAddress(data.display_name);
        }
      } catch (error) {
        console.error('Error getting address:', error);
      }
      setIsLoadingAddress(false);
    });

    // Allow clicking on map to move marker
    map.current.on('click', async (e) => {
      if (!marker.current) return;
      marker.current.setLngLat(e.lngLat);
      setCurrentCoords({ lat: e.lngLat.lat, lng: e.lngLat.lng });
      
      setIsLoadingAddress(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.lngLat.lat}&lon=${e.lngLat.lng}&addressdetails=1`
        );
        const data = await response.json();
        if (data.display_name) {
          setCurrentAddress(data.display_name);
        }
      } catch (error) {
        console.error('Error getting address:', error);
      }
      setIsLoadingAddress(false);
    });

    return () => {
      map.current?.remove();
    };
  }, [latitude, longitude]);

  const handleConfirm = () => {
    onConfirm(currentCoords.lat, currentCoords.lng, currentAddress);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-card rounded-xl overflow-hidden shadow-lg border border-border">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-64 sm:h-80" />
      
      {/* Address Display */}
      <div className="p-4 border-t border-border">
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Dirección seleccionada:</p>
            <p className="text-sm text-muted-foreground">
              {isLoadingAddress ? 'Cargando dirección...' : currentAddress}
            </p>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mb-4">
          Puedes arrastrar el marcador o hacer clic en el mapa para ajustar tu ubicación
        </p>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={isLoadingAddress}
          >
            <Check className="w-4 h-4 mr-2" />
            Confirmar Ubicación
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddressMap;
