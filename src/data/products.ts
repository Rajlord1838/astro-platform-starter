import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A versatile essential for any wardrobe. Made with 100% organic cotton.',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        description: 'Vintage-inspired denim jacket with a relaxed fit and faded wash.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Slim Fit Jeans',
        description: 'Comfortable stretch denim in a modern slim fit silhouette.',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1542272604-780c8d47b09b?auto=format&fit=crop&q=80&w=800',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Summer Floral Dress',
        description: 'Lightweight midi dress with a delicate floral print and wrap design.',
        price: 65.00,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
        category: 'Dresses'
    },
    {
        id: '5',
        name: 'Leather Crossbody Bag',
        description: 'Genuine leather bag with adjustable strap and brass hardware.',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800',
        category: 'Accessories'
    },
    {
        id: '6',
        name: 'Canvas Sneakers',
        description: 'Classic low-top sneakers perfect for everyday wear.',
        price: 55.00,
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
        category: 'Footwear'
    }
];
