// AWS API Gateway service
const API_BASE_URL = 'https://w7cncp3nyi.execute-api.us-east-1.amazonaws.com/prod';

// AWS API response types
export interface AWSProducto {
  producto_id: string;
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface AWSPedido {
  pedido_id: string;
  user_id: string;
  tenant_id: string;
  productos: AWSProducto[];
  total: number;
  estado: 'PENDIENTE' | 'CONFIRMADO' | 'PREPARANDO' | 'LISTO' | 'ENTREGADO' | 'CANCELADO';
  fecha_pedido: string;
  direccion?: string;
  cliente_nombre?: string;
  cliente_telefono?: string;
  notas?: string;
}

export interface CreatePedidoRequest {
  productos: AWSProducto[];
  total: number;
  direccion: string;
  cliente_nombre: string;
  cliente_telefono: string;
  notas?: string;
}

// Map AWS status to local status
export const mapAWSStatusToLocal = (awsStatus: string): string => {
  const statusMap: Record<string, string> = {
    'PENDIENTE': 'pending',
    'CONFIRMADO': 'confirmed',
    'PREPARANDO': 'preparing',
    'LISTO': 'ready',
    'ENTREGADO': 'delivered',
    'CANCELADO': 'cancelled',
  };
  return statusMap[awsStatus] || 'pending';
};

// Map local status to AWS status
export const mapLocalStatusToAWS = (localStatus: string): string => {
  const statusMap: Record<string, string> = {
    'pending': 'PENDIENTE',
    'confirmed': 'CONFIRMADO',
    'preparing': 'PREPARANDO',
    'ready': 'LISTO',
    'delivered': 'ENTREGADO',
    'cancelled': 'CANCELADO',
  };
  return statusMap[localStatus] || 'PENDIENTE';
};

// Create a new order
export const createPedido = async (pedido: CreatePedidoRequest): Promise<{ success: boolean; pedido_id?: string; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pedidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, pedido_id: data.pedido_id };
    } else {
      return { success: false, error: data.message || 'Error al crear pedido' };
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: 'Error de conexión' };
  }
};

// Get order status
export const getPedidoEstado = async (pedidoId: string): Promise<{ success: boolean; pedido?: AWSPedido; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}/estado`);
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, pedido: data.pedido || data };
    } else {
      return { success: false, error: data.message || 'Pedido no encontrado' };
    }
  } catch (error) {
    console.error('Error getting order status:', error);
    return { success: false, error: 'Error de conexión' };
  }
};

// Get all active orders
export const getPedidosActivos = async (): Promise<{ success: boolean; pedidos?: AWSPedido[]; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pedidos/activos`);
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, pedidos: data.pedidos || [] };
    } else {
      return { success: false, error: data.message || 'Error al obtener pedidos' };
    }
  } catch (error) {
    console.error('Error getting active orders:', error);
    return { success: false, error: 'Error de conexión' };
  }
};

// Update order status
export const updatePedidoEstado = async (pedidoId: string, nuevoEstado: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}/estado`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado: mapLocalStatusToAWS(nuevoEstado) }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: data.message || 'Error al actualizar estado' };
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false, error: 'Error de conexión' };
  }
};
