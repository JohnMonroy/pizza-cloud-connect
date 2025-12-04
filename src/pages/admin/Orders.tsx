import { useState, useEffect } from 'react';
import { Order, ORDER_STATUS_CONFIG, OrderStatus } from '@/types/order';
import OrderCard from '@/components/admin/OrderCard';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pizza, RefreshCw } from 'lucide-react';
import { getPedidosActivos, updatePedidoEstado, AWSPedido, mapAWSStatusToLocal } from '@/services/api';

// Convert AWS pedido to local Order format
const mapAWSPedidoToOrder = (pedido: AWSPedido): Order => ({
  id: pedido.pedido_id,
  orderNumber: pedido.pedido_id.slice(0, 8).toUpperCase(),
  items: pedido.productos.map(p => ({
    pizzaId: p.producto_id,
    pizzaName: p.nombre,
    quantity: p.cantidad,
    size: 'medium' as const,
    unitPrice: p.precio,
  })),
  total: pedido.total,
  status: mapAWSStatusToLocal(pedido.estado) as OrderStatus,
  customerName: pedido.cliente_nombre || 'Cliente',
  customerPhone: pedido.cliente_telefono || '',
  customerAddress: pedido.direccion,
  notes: pedido.notas,
  createdAt: pedido.fecha_pedido,
  updatedAt: pedido.fecha_pedido,
});

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const loadOrders = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    
    const result = await getPedidosActivos();
    
    if (result.success && result.pedidos) {
      const mappedOrders = result.pedidos.map(mapAWSPedidoToOrder);
      setOrders(mappedOrders);
    } else {
      toast({
        title: 'Error',
        description: result.error || 'No se pudieron cargar los pedidos',
        variant: 'destructive',
      });
    }
    
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadOrders();
    
    // Actualizar cada 15 segundos
    const interval = setInterval(() => loadOrders(), 15000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    // Optimistic update
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    ));
    
    const result = await updatePedidoEstado(orderId, newStatus);
    
    if (result.success) {
      const statusLabel = ORDER_STATUS_CONFIG[newStatus].label;
      toast({
        title: 'Estado actualizado',
        description: `El pedido ha sido marcado como "${statusLabel}"`,
      });
    } else {
      // Revert on error
      loadOrders();
      toast({
        title: 'Error',
        description: result.error || 'No se pudo actualizar el estado',
        variant: 'destructive',
      });
    }
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(o => o.status === activeTab);

  const getStatusCount = (status: string) => {
    if (status === 'all') return orders.length;
    return orders.filter(o => o.status === status).length;
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Pedidos</h1>
          <p className="text-muted-foreground mt-1">Gestiona todos los pedidos de tu pizzería</p>
        </div>
        <button
          onClick={() => loadOrders(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-pizza-red-dark transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Actualizar
        </button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-muted p-1 rounded-xl flex-wrap h-auto gap-1">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-background rounded-lg px-4 py-2"
          >
            Todos ({getStatusCount('all')})
          </TabsTrigger>
          {Object.entries(ORDER_STATUS_CONFIG).map(([status, config]) => (
            <TabsTrigger 
              key={status} 
              value={status}
              className="data-[state=active]:bg-background rounded-lg px-4 py-2"
            >
              <div className={`w-2 h-2 rounded-full ${config.color} mr-2`} />
              {config.label} ({getStatusCount(status)})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                />
              ))}
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Pizza className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No hay pedidos en esta categoría</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
