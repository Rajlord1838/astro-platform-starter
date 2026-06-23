import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 29.99,
        description: 'A timeless classic white t-shirt made from 100% organic cotton.',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        price: 89.99,
        description: 'Vintage wash denim jacket with a relaxed fit.',
        imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Slim Fit Jeans',
        price: 59.99,
        description: 'Comfortable slim fit jeans in a dark wash.',
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Floral Summer Dress',
        price: 49.99,
        description: 'Lightweight floral dress perfect for summer days.',
        imageUrl: 'https://images.unsplash.com/photo-1515347619362-bfbb16e6dcae?auto=format&fit=crop&q=80&w=800',
        category: 'Dresses'
    },
    {
        id: '5',
        name: 'Leather Crossbody Bag',
        price: 129.99,
        description: 'Genuine leather crossbody bag with adjustable strap.',
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
        category: 'Accessories'
    },
    {
        id: '6',
        name: 'Running Sneakers',
        price: 119.99,
        description: 'Lightweight running sneakers with responsive cushioning.',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        category: 'Shoes'
    }
];
