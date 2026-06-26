import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A comfortable, classic white cotton t-shirt.',
        price: 25.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        category: 'T-Shirts'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        description: 'Vintage blue denim jacket with a relaxed fit.',
        price: 89.50,
        image: 'https://images.unsplash.com/photo-1551537482-f209bfc8d42d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        category: 'Jackets'
    },
    {
        id: '3',
        name: 'Leather Sneakers',
        description: 'Premium white leather sneakers for everyday wear.',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        category: 'Shoes'
    },
    {
        id: '4',
        name: 'Black Chino Pants',
        description: 'Slim fit black chinos made with stretch cotton.',
        price: 55.00,
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        category: 'Pants'
    },
    {
        id: '5',
        name: 'Wool Blend Sweater',
        description: 'Cozy grey wool blend sweater for chilly days.',
        price: 75.00,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        category: 'Sweaters'
    },
    {
        id: '6',
        name: 'Canvas Tote Bag',
        description: 'Durable canvas tote bag with a minimalist design.',
        price: 20.00,
        image: 'https://images.unsplash.com/photo-1597488059868-80f2dbf77c57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        category: 'Accessories'
    }
];
