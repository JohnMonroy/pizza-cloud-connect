import { createContext, useContext, useState, ReactNode } from 'react';

interface DeliveryContextType {
  address: string | null;
  isLocationConfirmed: boolean;
  setDeliveryAddress: (address: string) => void;
  clearAddress: () => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const DeliveryProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isLocationConfirmed, setIsLocationConfirmed] = useState(false);

  const setDeliveryAddress = (newAddress: string) => {
    setAddress(newAddress);
    setIsLocationConfirmed(true);
  };

  const clearAddress = () => {
    setAddress(null);
    setIsLocationConfirmed(false);
  };

  return (
    <DeliveryContext.Provider
      value={{ address, isLocationConfirmed, setDeliveryAddress, clearAddress }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (!context) throw new Error('useDelivery must be used within DeliveryProvider');
  return context;
};
