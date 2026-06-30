import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 25.0,
        description: 'A timeless, comfortable white t-shirt made from 100% organic cotton.',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500',
        category: 'Shirts'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        price: 85.0,
        description: 'A versatile denim jacket perfect for any casual outfit.',
        imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=500',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Floral Summer Dress',
        price: 55.0,
        description: 'A light and breezy floral dress, ideal for warm summer days.',
        imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=500',
        category: 'Dresses'
    },
    {
        id: '4',
        name: 'Leather Crossbody Bag',
        price: 120.0,
        description: 'Elegant genuine leather crossbody bag with adjustable strap.',
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=500',
        category: 'Accessories'
    },
    {
        id: '5',
        name: 'Slim Fit Jeans',
        price: 65.0,
        description: 'Comfortable slim fit jeans with a slight stretch.',
        imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=500',
        category: 'Pants'
    },
    {
        id: '6',
        name: 'Classic Sunglasses',
        price: 35.0,
        description: 'UV400 protection sunglasses with a classic design.',
        imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=500',
        category: 'Accessories'
    }
];
