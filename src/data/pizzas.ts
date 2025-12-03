import { Pizza } from '@/types/pizza';

// Mock data - easily replaceable with AWS API calls
export const pizzas: Pizza[] = [
  {
    id: '1',
    name: 'Margherita',
    description: 'La clásica italiana con tomate San Marzano, mozzarella fresca y albahaca',
    price: 12.50,
    image: '/pizzas/margherita.jpg',
    ingredients: ['Tomate', 'Mozzarella', 'Albahaca', 'Aceite de oliva'],
    category: 'classica',
    isPopular: true,
  },
  {
    id: '2',
    name: 'Pepperoni',
    description: 'Pepperoni artesanal sobre base de tomate y mozzarella fundida',
    price: 14.50,
    image: '/pizzas/pepperoni.jpg',
    ingredients: ['Tomate', 'Mozzarella', 'Pepperoni', 'Orégano'],
    category: 'classica',
    isPopular: true,
  },
  {
    id: '3',
    name: 'Quattro Formaggi',
    description: 'Mezcla de mozzarella, gorgonzola, parmesano y fontina',
    price: 16.00,
    image: '/pizzas/quattro-formaggi.jpg',
    ingredients: ['Mozzarella', 'Gorgonzola', 'Parmesano', 'Fontina'],
    category: 'speciale',
  },
  {
    id: '4',
    name: 'Prosciutto e Funghi',
    description: 'Jamón curado italiano con champiñones frescos salteados',
    price: 15.50,
    image: '/pizzas/prosciutto-funghi.jpg',
    ingredients: ['Tomate', 'Mozzarella', 'Prosciutto', 'Champiñones'],
    category: 'speciale',
    isPopular: true,
  },
  {
    id: '5',
    name: 'Vegetariana',
    description: 'Pimientos, champiñones, aceitunas, cebolla y tomate cherry',
    price: 14.00,
    image: '/pizzas/vegetariana.jpg',
    ingredients: ['Tomate', 'Mozzarella', 'Pimientos', 'Champiñones', 'Aceitunas'],
    category: 'vegetariana',
  },
  {
    id: '6',
    name: 'Diavola',
    description: 'Para los amantes del picante: salami picante y guindilla',
    price: 15.00,
    image: '/pizzas/diavola.jpg',
    ingredients: ['Tomate', 'Mozzarella', 'Salami picante', 'Guindilla'],
    category: 'speciale',
  },
];

// Future AWS integration functions
export const fetchPizzasFromAPI = async (): Promise<Pizza[]> => {
  // TODO: Replace with AWS API Gateway call
  // const response = await fetch('https://your-api-gateway.amazonaws.com/pizzas');
  // return response.json();
  return pizzas;
};
