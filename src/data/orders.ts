import { Order } from '@/types/order';

// Mock orders - replace with AWS API Gateway calls
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'PZ-001',
    items: [
      { pizzaId: '1', pizzaName: 'Margherita', quantity: 2, size: 'medium', unitPrice: 12.50 },
      { pizzaId: '2', pizzaName: 'Pepperoni', quantity: 1, size: 'large', unitPrice: 14.50 },
    ],
    total: 39.50,
    status: 'pending',
    customerName: 'Carlos García',
    customerPhone: '+34 612 345 678',
    customerAddress: 'Calle Mayor 123, Madrid',
    createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60000).toISOString(),
  },
  {
    id: '2',
    orderNumber: 'PZ-002',
    items: [
      { pizzaId: '3', pizzaName: 'Quattro Formaggi', quantity: 1, size: 'large', unitPrice: 16.00 },
    ],
    total: 16.00,
    status: 'preparing',
    customerName: 'María López',
    customerPhone: '+34 698 765 432',
    notes: 'Sin cebolla por favor',
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  {
    id: '3',
    orderNumber: 'PZ-003',
    items: [
      { pizzaId: '4', pizzaName: 'Prosciutto e Funghi', quantity: 2, size: 'medium', unitPrice: 15.50 },
      { pizzaId: '5', pizzaName: 'Vegetariana', quantity: 1, size: 'small', unitPrice: 14.00 },
    ],
    total: 45.00,
    status: 'ready',
    customerName: 'Juan Martínez',
    customerPhone: '+34 677 889 900',
    customerAddress: 'Av. Libertad 45, Madrid',
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: '4',
    orderNumber: 'PZ-004',
    items: [
      { pizzaId: '6', pizzaName: 'Diavola', quantity: 3, size: 'large', unitPrice: 15.00 },
    ],
    total: 45.00,
    status: 'confirmed',
    customerName: 'Ana Sánchez',
    customerPhone: '+34 655 443 221',
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 60000).toISOString(),
  },
  {
    id: '5',
    orderNumber: 'PZ-005',
    items: [
      { pizzaId: '1', pizzaName: 'Margherita', quantity: 1, size: 'small', unitPrice: 12.50 },
    ],
    total: 12.50,
    status: 'delivered',
    customerName: 'Pedro Ruiz',
    customerPhone: '+34 611 222 333',
    customerAddress: 'Plaza España 8, Madrid',
    createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 60000).toISOString(),
  },
];

// Future AWS integration
export const fetchOrdersFromAPI = async (): Promise<Order[]> => {
  // TODO: Replace with AWS API Gateway call
  // const response = await fetch('https://your-api-gateway.amazonaws.com/orders');
  // return response.json();
  return mockOrders;
};

export const updateOrderStatusAPI = async (orderId: string, status: string): Promise<Order> => {
  // TODO: Replace with AWS API Gateway call
  // const response = await fetch(`https://your-api-gateway.amazonaws.com/orders/${orderId}`, {
  //   method: 'PATCH',
  //   body: JSON.stringify({ status })
  // });
  // return response.json();
  const order = mockOrders.find(o => o.id === orderId);
  if (!order) throw new Error('Order not found');
  return { ...order, status: status as Order['status'], updatedAt: new Date().toISOString() };
};
