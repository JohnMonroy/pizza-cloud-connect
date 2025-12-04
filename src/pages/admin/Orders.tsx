import { useState, useEffect } from 'react';
import { mockOrders } from '@/data/orders';
import { Order, ORDER_STATUS_CONFIG, OrderStatus } from '@/types/order';
import OrderCard from '@/components/admin/OrderCard';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pizza } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const { toast } = useToast();

  // Cargar pedidos de localStorage y mock
  useEffect(() => {
    const loadOrders = () => {
      const localOrders: Order[] = [];
      
      // Buscar todos los pedidos en localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('order_')) {
          try {
            const order = JSON.parse(localStorage.getItem(key) || '');
            localOrders.push(order);
          } catch (e) {
            console.error('Error parsing order:', e);
          }
        }
      }
      
      // Combinar con mock orders (evitar duplicados)
      const allOrders = [...localOrders];
      mockOrders.forEach(mockOrder => {
        if (!allOrders.find(o => o.orderNumber === mockOrder.orderNumber)) {
          allOrders.push(mockOrder);
        }
      });
      
      setOrders(allOrders);
    };

    loadOrders();
    
    // Actualizar cada 5 segundos para ver nuevos pedidos
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => {
      const updatedOrders = prev.map(order => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, status: newStatus, updatedAt: new Date().toISOString() };
          // Actualizar en localStorage para que el cliente vea el cambio
          localStorage.setItem(`order_${order.orderNumber}`, JSON.stringify(updatedOrder));
          return updatedOrder;
        }
        return order;
      });
      return updatedOrders;
    });
    
    const statusLabel = ORDER_STATUS_CONFIG[newStatus].label;
    toast({
      title: 'Estado actualizado',
      description: `El pedido ha sido marcado como "${statusLabel}"`,
    });
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(o => o.status === activeTab);

  const getStatusCount = (status: string) => {
    if (status === 'all') return orders.length;
    return orders.filter(o => o.status === status).length;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Pedidos</h1>
        <p className="text-muted-foreground mt-1">Gestiona todos los pedidos de tu pizzería</p>
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
