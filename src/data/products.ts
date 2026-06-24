import type { Product } from '../types';

export const products: Product[] = [
    {
        id: 'p1',
        name: 'Classic White T-Shirt',
        price: 29.99,
        description: 'A comfortable, everyday essential white t-shirt made from 100% organic cotton.',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Tops'
    },
    {
        id: 'p2',
        name: 'Denim Jacket',
        price: 89.99,
        description: 'Vintage-style denim jacket with a relaxed fit. Perfect for layering.',
        imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Outerwear'
    },
    {
        id: 'p3',
        name: 'Slim Fit Jeans',
        price: 59.99,
        description: 'Premium denim with a slight stretch for comfort, styled in a modern slim fit.',
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Bottoms'
    },
    {
        id: 'p4',
        name: 'Canvas Sneakers',
        price: 49.99,
        description: 'Classic low-top canvas sneakers, suitable for any casual outfit.',
        imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Shoes'
    },
    {
        id: 'p5',
        name: 'Knit Sweater',
        price: 69.99,
        description: 'Warm and cozy chunky knit sweater, ideal for colder days.',
        imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Tops'
    },
    {
        id: 'p6',
        name: 'Summer Dress',
        price: 79.99,
        description: 'Lightweight floral summer dress with a flowy silhouette.',
        imageUrl: 'https://images.unsplash.com/photo-1515347619152-6d1f9435b2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Dresses'
    }
];
