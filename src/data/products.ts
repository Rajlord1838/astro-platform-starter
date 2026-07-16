export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    description: 'A timeless staple. Made with 100% organic cotton for ultimate comfort.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
    category: 'Tops'
  },
  {
    id: '2',
    name: 'Denim Jacket',
    price: 89.99,
    description: 'Vintage wash denim jacket with a relaxed fit. Perfect for layering.',
    image: 'https://images.unsplash.com/photo-1601333144130-8c1f12369685?q=80&w=800&auto=format&fit=crop',
    category: 'Outerwear'
  },
  {
    id: '3',
    name: 'Slim Fit Jeans',
    price: 79.99,
    description: 'Comfort stretch denim in a classic dark wash.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    category: 'Bottoms'
  },
  {
    id: '4',
    name: 'Linen Button-Down',
    price: 59.99,
    description: 'Breathable linen shirt for warm days. Features a relaxed collar.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
    category: 'Tops'
  },
  {
    id: '5',
    name: 'Athletic Sneakers',
    price: 119.99,
    description: 'Lightweight and supportive for everyday wear.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    category: 'Shoes'
  },
  {
    id: '6',
    name: 'Leather Messenger Bag',
    price: 149.99,
    description: 'Handcrafted full-grain leather bag with laptop compartment.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
    category: 'Accessories'
  }
];
