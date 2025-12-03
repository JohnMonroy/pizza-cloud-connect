// Types prepared for AWS integration (DynamoDB, API Gateway, etc.)

export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  category: 'classica' | 'speciale' | 'vegetariana';
  isPopular?: boolean;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  customerName: string;
  customerPhone: string;
  createdAt: string;
}

export interface OrderItem {
  pizzaId: string;
  quantity: number;
  size: 'small' | 'medium' | 'large';
}
