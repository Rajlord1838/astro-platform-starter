import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
        description: 'A comfortable, everyday classic white tee made from 100% organic cotton.',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
        description: 'Vintage wash denim jacket with classic button styling.',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Slim Fit Jeans',
        price: 59.50,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
        description: 'Classic blue denim jeans with a modern slim fit cut.',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Summer Floral Dress',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
        description: 'Lightweight summer dress featuring a delicate floral print.',
        category: 'Dresses'
    },
    {
        id: '5',
        name: 'Leather Crossbody Bag',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
        description: 'Genuine leather crossbody bag with adjustable strap and brass hardware.',
        category: 'Accessories'
    },
    {
        id: '6',
        name: 'Canvas Sneakers',
        price: 55.00,
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
        description: 'Classic low-top canvas sneakers, perfect for everyday wear.',
        category: 'Shoes'
    }
];
