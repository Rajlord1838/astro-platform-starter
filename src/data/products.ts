import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A timeless classic white t-shirt made from 100% cotton.',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Blue Denim Jacket',
        description: 'A stylish and versatile blue denim jacket.',
        price: 75.00,
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Slim Fit Jeans',
        description: 'Comfortable and fashionable slim fit jeans.',
        price: 60.00,
        image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=500&q=80',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Black Leather Boots',
        description: 'Durable and sleek black leather boots.',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&q=80',
        category: 'Footwear'
    },
    {
        id: '5',
        name: 'Floral Summer Dress',
        description: 'A light and breezy floral dress perfect for summer.',
        price: 55.00,
        image: 'https://images.unsplash.com/photo-1572804013309-82a89b4360e2?w=500&q=80',
        category: 'Dresses'
    },
    {
        id: '6',
        name: 'Knit Beanie',
        description: 'Keep warm with this cozy knit beanie.',
        price: 20.00,
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80', // Replace with a beanie image if needed
        category: 'Accessories'
    }
];
