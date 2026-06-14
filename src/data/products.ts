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
    description: 'A premium cotton classic white t-shirt. Perfect for everyday wear, this shirt features a comfortable fit and durable construction.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    category: 'Tops'
  },
  {
    id: '2',
    name: 'Denim Jacket',
    price: 89.99,
    description: 'Vintage-wash denim jacket with classic button detailing. A timeless piece that gets better with age.',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
    category: 'Outerwear'
  },
  {
    id: '3',
    name: 'Black Slim Jeans',
    price: 59.99,
    description: 'Comfortable stretch-denim black jeans in a slim fit. Features a classic five-pocket design and subtle hardware.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    category: 'Bottoms'
  },
  {
    id: '4',
    name: 'Knit Sweater',
    price: 49.99,
    description: 'Cozy crewneck knit sweater made from a soft wool blend. Perfect for layering during colder months.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    category: 'Tops'
  },
  {
    id: '5',
    name: 'Leather Sneakers',
    price: 119.99,
    description: 'Minimalist white leather sneakers with a comfortable rubber sole. Versatile enough for any casual outfit.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    category: 'Footwear'
  },
  {
    id: '6',
    name: 'Cotton Chinos',
    price: 45.00,
    description: 'Tailored fit cotton chinos with a slight stretch for comfort. Ideal for both office and casual wear.',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    category: 'Bottoms'
  }
];
