export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 25,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500',
    description: 'A comfortable, 100% cotton classic white t-shirt.',
  },
  {
    id: '2',
    name: 'Denim Jacket',
    price: 85,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=500',
    description: 'Vintage wash denim jacket with a relaxed fit.',
  },
  {
    id: '3',
    name: 'Slim Fit Chinos',
    price: 60,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=500',
    description: 'Versatile slim fit chinos in classic khaki.',
  },
  {
    id: '4',
    name: 'Leather Sneakers',
    price: 120,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=500',
    description: 'Minimalist white leather sneakers for everyday wear.',
  },
  {
    id: '5',
    name: 'Striped Oxford Shirt',
    price: 55,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80&w=500',
    description: 'Blue and white striped oxford cotton button-down.',
  },
  {
    id: '6',
    name: 'Wool Blend Beanie',
    price: 30,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=500',
    description: 'Warm, ribbed knit beanie in charcoal grey.',
  },
];
