export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'A timeless classic. Made from 100% organic cotton for ultimate comfort.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Tops'
  },
  {
    id: '2',
    name: 'Denim Jacket',
    description: 'Vintage wash denim jacket with classic styling. Perfect for layering.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Outerwear'
  },
  {
    id: '3',
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans with a touch of stretch for all-day comfort.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542272604-780c87853293?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Bottoms'
  },
  {
    id: '4',
    name: 'Wool Blend Sweater',
    description: 'Cozy crewneck sweater perfect for chilly evenings. Available in multiple colors.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Tops'
  },
  {
    id: '5',
    name: 'Summer Linen Dress',
    description: 'Light and breathable linen dress, ideal for warm weather days.',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1515347619362-f67499d6dca3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Dresses'
  },
  {
    id: '6',
    name: 'Leather Crossbody Bag',
    description: 'Minimalist leather bag with adjustable strap and brass hardware.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories'
  }
];
