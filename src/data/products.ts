export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    description: 'A timeless classic white t-shirt made from 100% organic cotton.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    name: 'Denim Jacket',
    price: 89.99,
    description: 'Vintage wash denim jacket with a relaxed fit.',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Black Skinny Jeans',
    price: 59.99,
    description: 'Comfortable stretch black skinny jeans for everyday wear.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    name: 'Leather Sneakers',
    price: 119.99,
    description: 'Premium white leather sneakers with minimalist design.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '5',
    name: 'Striped Oxford Shirt',
    price: 49.99,
    description: 'Long sleeve striped button-down shirt.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '6',
    name: 'Wool Beanie',
    price: 24.99,
    description: 'Warm ribbed wool beanie in charcoal grey.',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800',
  }
];
