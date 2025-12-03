import { useState } from 'react';
import { mockOrders } from '@/data/orders';
import { Order, ORDER_STATUS_CONFIG, OrderStatus } from '@/types/order';
import StatsCard from '@/components/admin/StatsCard';
import OrderCard from '@/components/admin/OrderCard';
import { ClipboardList, DollarSign, Clock, Pizza } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { toast } = useToast();

  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'confirmed');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');
  const todayTotal = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
    
    const statusLabel = ORDER_STATUS_CONFIG[newStatus].label;
    toast({
      title: 'Estado actualizado',
      description: `El pedido ha sido marcado como "${statusLabel}"`,
    });
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-black text-foreground uppercase tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Vista general de tu pizzería</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Pedidos Pendientes"
          value={pendingOrders.length}
          subtitle="Requieren atención"
          icon={ClipboardList}
          color="warning"
        />
        <StatsCard
          title="En Preparación"
          value={preparingOrders.length}
          subtitle="En cocina ahora"
          icon={Pizza}
          color="accent"
        />
        <StatsCard
          title="Listos para Entrega"
          value={readyOrders.length}
          subtitle="Esperando recogida"
          icon={Clock}
          color="success"
        />
        <StatsCard
          title="Ventas del Día"
          value={`€${todayTotal.toFixed(2)}`}
          icon={DollarSign}
          trend={{ value: 12, isPositive: true }}
          color="primary"
        />
      </div>

      {/* Active Orders */}
      <div>
        <h2 className="text-xl font-display font-bold text-foreground mb-4 uppercase">
          Pedidos Activos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders
            .filter(o => !['delivered', 'cancelled'].includes(o.status))
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
              />
            ))}
        </div>
        {orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Pizza className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No hay pedidos activos en este momento</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;