import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A comfortable, 100% cotton white t-shirt. Perfect for everyday wear.',
        price: 29.99,
        imageUrl: 'https://placehold.co/600x800/eeeeee/333333?text=Classic+T-Shirt',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Slim Fit Denim Jeans',
        description: 'Stylish blue denim jeans with a slim fit. Durable and fashionable.',
        price: 79.50,
        imageUrl: 'https://placehold.co/600x800/eeeeee/333333?text=Denim+Jeans',
        category: 'Bottoms'
    },
    {
        id: '3',
        name: 'Leather Jacket',
        description: 'Premium faux leather jacket. Adds edge to any outfit.',
        price: 149.99,
        imageUrl: 'https://placehold.co/600x800/eeeeee/333333?text=Leather+Jacket',
        category: 'Outerwear'
    },
    {
        id: '4',
        name: 'Running Sneakers',
        description: 'Lightweight running sneakers with responsive cushioning.',
        price: 120.00,
        imageUrl: 'https://placehold.co/600x800/eeeeee/333333?text=Running+Sneakers',
        category: 'Footwear'
    },
    {
        id: '5',
        name: 'Knit Beanie',
        description: 'Warm and cozy knit beanie. Keep your head warm in style.',
        price: 19.99,
        imageUrl: 'https://placehold.co/600x800/eeeeee/333333?text=Knit+Beanie',
        category: 'Accessories'
    },
    {
        id: '6',
        name: 'Sunglasses',
        description: 'Classic aviator sunglasses with UV protection.',
        price: 35.00,
        imageUrl: 'https://placehold.co/600x800/eeeeee/333333?text=Sunglasses',
        category: 'Accessories'
    }
];
