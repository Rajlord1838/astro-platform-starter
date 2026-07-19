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
    description: 'A comfortable and versatile white t-shirt.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    category: 'Tops'
  },
  {
    id: '2',
    name: 'Denim Jacket',
    description: 'A timeless denim jacket for any occasion.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551537482-f209bfc24754?auto=format&fit=crop&q=80&w=800',
    category: 'Outerwear'
  },
  {
    id: '3',
    name: 'Black Jeans',
    description: 'Stylish and comfortable black denim jeans.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
    category: 'Bottoms'
  },
  {
    id: '4',
    name: 'Summer Dress',
    description: 'A light and breezy summer dress.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
    category: 'Dresses'
  },
  {
    id: '5',
    name: 'Leather Sneakers',
    description: 'Classic leather sneakers for everyday wear.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    category: 'Shoes'
  },
  {
    id: '6',
    name: 'Knitted Sweater',
    description: 'A warm and cozy knitted sweater.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800',
    category: 'Tops'
  }
];
