import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, ChefHat, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { Order, OrderStatus, ORDER_STATUS_CONFIG } from '@/types/order';
import { mockOrders } from '@/data/orders';

const STATUS_STEPS: { status: OrderStatus; icon: React.ElementType; label: string }[] = [
  { status: 'pending', icon: Clock, label: 'Pendiente' },
  { status: 'confirmed', icon: CheckCircle, label: 'Confirmado' },
  { status: 'preparing', icon: ChefHat, label: 'Preparando' },
  { status: 'ready', icon: Package, label: 'Listo' },
  { status: 'delivered', icon: Truck, label: 'Entregado' },
];

const OrderTracking = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga del pedido (después conectar con API)
    const loadOrder = () => {
      // Buscar en localStorage primero (pedidos recientes)
      const savedOrder = localStorage.getItem(`order_${orderNumber}`);
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      } else {
        // Buscar en mock orders para demo
        const found = mockOrders.find(o => o.orderNumber === orderNumber);
        if (found) {
          setOrder(found);
        }
      }
      setLoading(false);
    };

    loadOrder();

    // Simular actualización en tiempo real (cada 10 segundos)
    const interval = setInterval(() => {
      const savedOrder = localStorage.getItem(`order_${orderNumber}`);
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-pizza-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-pizza-black pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-primary-foreground mb-4">
            Pedido no encontrado
          </h1>
          <p className="text-primary-foreground/70 mb-8">
            No pudimos encontrar el pedido #{orderNumber}
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  const currentStatusIndex = STATUS_STEPS.findIndex(s => s.status === order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="min-h-screen bg-pizza-black pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al Inicio
        </button>

        {/* Header */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-display text-2xl font-black text-foreground">
                Pedido #{order.orderNumber}
              </h1>
              <p className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleString('es-ES')}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-white text-sm font-bold ${ORDER_STATUS_CONFIG[order.status].color}`}>
              {ORDER_STATUS_CONFIG[order.status].label}
            </span>
          </div>
        </div>

        {/* Progress Steps */}
        {!isCancelled && (
          <div className="bg-card rounded-2xl p-6 border border-border mb-6">
            <h2 className="font-display text-lg font-bold text-foreground mb-6">
              Estado del Pedido
            </h2>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border" />
              <div 
                className="absolute left-6 top-6 w-0.5 bg-primary transition-all duration-500"
                style={{ height: `${(currentStatusIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
              />

              {/* Steps */}
              <div className="space-y-8">
                {STATUS_STEPS.map((step, index) => {
                  const isCompleted = index <= currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;
                  const Icon = step.icon;

                  return (
                    <div key={step.status} className="flex items-center gap-4 relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-muted-foreground'
                      } ${isCurrent ? 'ring-4 ring-primary/30 scale-110' : ''}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={`font-bold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.label}
                        </p>
                        {isCurrent && (
                          <p className="text-sm text-primary animate-pulse">En progreso...</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Cancelled State */}
        {isCancelled && (
          <div className="bg-destructive/10 rounded-2xl p-6 border border-destructive/30 mb-6">
            <div className="flex items-center gap-4">
              <XCircle className="w-12 h-12 text-destructive" />
              <div>
                <h2 className="font-display text-lg font-bold text-destructive">
                  Pedido Cancelado
                </h2>
                <p className="text-muted-foreground">
                  Este pedido ha sido cancelado. Contacta con nosotros si tienes dudas.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Details */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-display text-lg font-bold text-foreground mb-4">
            Detalle del Pedido
          </h2>
          
          <div className="space-y-3 mb-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-foreground">{item.pizzaName}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.size === 'small' ? 'Pequeña' : item.size === 'medium' ? 'Mediana' : 'Grande'} x{item.quantity}
                  </p>
                </div>
                <span className="font-bold text-primary">
                  €{(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex justify-between items-center text-lg font-display font-bold">
              <span>Total</span>
              <span className="text-primary">€{order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mt-6 pt-4 border-t border-border text-sm text-muted-foreground space-y-1">
            <p><span className="text-foreground font-medium">Cliente:</span> {order.customerName}</p>
            <p><span className="text-foreground font-medium">Teléfono:</span> {order.customerPhone}</p>
            {order.customerAddress && (
              <p><span className="text-foreground font-medium">Dirección:</span> {order.customerAddress}</p>
            )}
            {order.notes && (
              <p><span className="text-foreground font-medium">Notas:</span> {order.notes}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
