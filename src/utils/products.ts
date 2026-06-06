import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A comfortable, everyday essential white t-shirt made from 100% organic cotton.',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        description: 'A timeless denim jacket with a relaxed fit, perfect for layering.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Slim Fit Jeans',
        description: 'Classic blue jeans with a modern slim fit and a touch of stretch.',
        price: 65.00,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Floral Summer Dress',
        description: 'A light and breezy floral dress, ideal for warm summer days.',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        category: 'Dresses'
    },
    {
        id: '5',
        name: 'Leather Crossbody Bag',
        description: 'A sleek and versatile leather crossbody bag with adjustable strap.',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        category: 'Accessories'
    },
    {
        id: '6',
        name: 'Canvas Sneakers',
        description: 'Classic low-top canvas sneakers, comfortable and stylish for everyday wear.',
        price: 55.00,
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        category: 'Shoes'
    }
];
