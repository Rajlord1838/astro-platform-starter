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
    price: 29.99,
    image: 'https://placehold.co/400x500/eaeaea/333333?text=White+T-Shirt',
    description: 'A comfortable, breathable classic white t-shirt for everyday wear.',
  },
  {
    id: '2',
    name: 'Denim Jacket',
    price: 89.99,
    image: 'https://placehold.co/400x500/eaeaea/333333?text=Denim+Jacket',
    description: 'Stylish blue denim jacket that pairs perfectly with any casual outfit.',
  },
  {
    id: '3',
    name: 'Leather Sneakers',
    price: 119.99,
    image: 'https://placehold.co/400x500/eaeaea/333333?text=Leather+Sneakers',
    description: 'Premium white leather sneakers offering both comfort and style.',
  },
  {
    id: '4',
    name: 'Black Slim Jeans',
    price: 59.99,
    image: 'https://placehold.co/400x500/eaeaea/333333?text=Slim+Jeans',
    description: 'Versatile black slim-fit jeans made with stretchable fabric.',
  },
  {
    id: '5',
    name: 'Wool Blend Sweater',
    price: 75.00,
    image: 'https://placehold.co/400x500/eaeaea/333333?text=Wool+Sweater',
    description: 'Cozy wool blend sweater to keep you warm during chilly days.',
  },
  {
    id: '6',
    name: 'Canvas Tote Bag',
    price: 34.50,
    image: 'https://placehold.co/400x500/eaeaea/333333?text=Tote+Bag',
    description: 'Durable and spacious canvas tote bag for your daily essentials.',
  }
];
