export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 25.00,
    description: 'A timeless classic. Made with 100% organic cotton for ultimate comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    category: 'Tops'
  },
  {
    id: '2',
    name: 'Denim Jacket',
    price: 89.99,
    description: 'Vintage wash denim jacket with a relaxed fit. Perfect for layering.',
    imageUrl: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800',
    category: 'Outerwear'
  },
  {
    id: '3',
    name: 'Slim Fit Jeans',
    price: 65.00,
    description: 'Everyday slim fit jeans with a slight stretch for comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
    category: 'Bottoms'
  },
  {
    id: '4',
    name: 'Floral Summer Dress',
    price: 55.00,
    description: 'Lightweight floral dress, ideal for warm summer days.',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
    category: 'Dresses'
  },
  {
    id: '5',
    name: 'Leather Crossbody Bag',
    price: 120.00,
    description: 'Genuine leather bag with adjustable strap and multiple compartments.',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories'
  },
  {
    id: '6',
    name: 'Minimalist Sneakers',
    price: 95.00,
    description: 'Clean, versatile white sneakers that go with any outfit.',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    category: 'Footwear'
  }
];
