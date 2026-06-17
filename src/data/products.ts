import type { Product } from '../types';

export const products: Product[] = [
    {
        id: 'p1',
        name: 'Classic White T-Shirt',
        description: 'A timeless classic white t-shirt made from 100% organic cotton.',
        price: 29.99,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Tops'
    },
    {
        id: 'p2',
        name: 'Denim Jacket',
        description: 'Vintage-inspired blue denim jacket with distressed details.',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Outerwear'
    },
    {
        id: 'p3',
        name: 'Slim Fit Black Jeans',
        description: 'Comfortable slim fit black jeans perfect for any occasion.',
        price: 59.99,
        imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Bottoms'
    },
    {
        id: 'p4',
        name: 'Leather Crossbody Bag',
        description: 'Elegant leather crossbody bag with adjustable strap.',
        price: 120.00,
        imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Accessories'
    },
    {
        id: 'p5',
        name: 'Summer Floral Dress',
        description: 'Lightweight summer dress with a vibrant floral pattern.',
        price: 65.00,
        imageUrl: 'https://images.unsplash.com/photo-1515347619362-710c5112a02b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Dresses'
    },
    {
        id: 'p6',
        name: 'Minimalist Sneakers',
        description: 'Clean and versatile white sneakers for everyday wear.',
        price: 75.00,
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Shoes'
    }
];