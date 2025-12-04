import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, Phone, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useDelivery } from '@/contexts/DeliveryContext';
import { toast } from '@/hooks/use-toast';

const SIZE_LABELS = {
  small: 'Pequeña',
  medium: 'Mediana',
  large: 'Grande',
};

const SIZE_MULTIPLIERS = {
  small: 0.8,
  medium: 1,
  large: 1.3,
};

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { address: savedAddress } = useDelivery();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  // Pre-fill address from delivery context
  useEffect(() => {
    if (savedAddress) {
      setFormData(prev => ({ ...prev, address: savedAddress }));
    }
  }, [savedAddress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast({ title: 'Carrito vacío', description: 'Añade pizzas antes de hacer el pedido', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    
    // Generar número de pedido único
    const orderNumber = `PZ-${Date.now().toString(36).toUpperCase()}`;
    
    // Crear el pedido
    const newOrder = {
      id: Date.now().toString(),
      orderNumber,
      items: items.map(item => ({
        pizzaId: item.pizza.id,
        pizzaName: item.pizza.name,
        quantity: item.quantity,
        size: item.size,
        unitPrice: item.pizza.price * (item.size === 'small' ? 0.8 : item.size === 'large' ? 1.3 : 1),
      })),
      total,
      status: 'pending' as const,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      notes: formData.notes || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Guardar en localStorage (después conectar con API)
    localStorage.setItem(`order_${orderNumber}`, JSON.stringify(newOrder));
    
    // Simular envío del pedido
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: '¡Pedido realizado!',
      description: `Tu número de pedido es ${orderNumber}`,
    });
    
    clearCart();
    setIsSubmitting(false);
    navigate(`/order/${orderNumber}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-pizza-black pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-primary-foreground mb-4">
            Carrito Vacío
          </h1>
          <p className="text-primary-foreground/70 mb-8">No tienes pizzas en tu carrito</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Menú
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pizza-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al Menú
        </button>

        <h1 className="font-display text-4xl font-black text-primary-foreground mb-8 uppercase">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Datos de Entrega
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tu nombre"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+34 612 345 678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Dirección de Entrega
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={2}
                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Calle, número, piso..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Notas (opcional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Instrucciones especiales..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-lg font-display font-bold uppercase tracking-wide hover:bg-pizza-red-dark transition-colors disabled:opacity-50"
              >
                <CreditCard className="w-5 h-5" />
                {isSubmitting ? 'Procesando...' : `Confirmar Pedido - €${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="bg-card rounded-2xl p-6 border border-border h-fit">
            <h2 className="font-display text-xl font-bold text-foreground mb-6">
              Resumen del Pedido
            </h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => {
                const itemPrice = item.pizza.price * SIZE_MULTIPLIERS[item.size];
                return (
                  <div
                    key={`${item.pizza.id}-${item.size}`}
                    className="flex gap-3 pb-4 border-b border-border last:border-0"
                  >
                    <img
                      src={item.image}
                      alt={item.pizza.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground">{item.pizza.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {SIZE_LABELS[item.size]} x{item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-primary">
                      €{(itemPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className="text-green-500">Gratis</span>
              </div>
              <div className="flex justify-between text-xl font-display font-bold pt-2">
                <span>Total</span>
                <span className="text-primary">€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
