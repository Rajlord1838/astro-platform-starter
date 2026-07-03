import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White Tee',
        price: 29.99,
        description: 'A comfortable, everyday classic white t-shirt made from 100% organic cotton.',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
        category: 'T-Shirts'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        price: 89.99,
        description: 'Vintage wash denim jacket with a relaxed fit. Perfect for layering.',
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Slim Fit Jeans',
        price: 59.99,
        description: 'Comfortable slim fit jeans with a slight stretch for all-day wear.',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
        category: 'Pants'
    },
    {
        id: '4',
        name: 'Summer Floral Dress',
        price: 69.99,
        description: 'Lightweight floral dress ideal for warm summer days and evenings.',
        image: 'https://images.unsplash.com/photo-1572804013309-82a89b43af28?auto=format&fit=crop&q=80&w=800',
        category: 'Dresses'
    },
    {
        id: '5',
        name: 'Leather Crossbody Bag',
        price: 120.00,
        description: 'Premium leather crossbody bag with adjustable strap and brass hardware.',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
        category: 'Accessories'
    },
    {
        id: '6',
        name: 'Canvas Sneakers',
        price: 45.00,
        description: 'Classic canvas sneakers with rubber sole. Versatile and stylish.',
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
        category: 'Shoes'
    }
];
