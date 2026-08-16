import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White Tee',
        price: 25.00,
        description: 'A timeless, comfortable white t-shirt made from 100% organic cotton.',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Vintage Denim Jacket',
        price: 85.00,
        description: 'Classic fit denim jacket with a vintage wash.',
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'High-Waisted Jeans',
        price: 60.00,
        description: 'Comfortable high-waisted jeans with a straight leg cut.',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Silk Scarf',
        price: 35.00,
        description: 'Elegant silk scarf with a subtle geometric pattern.',
        image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
        category: 'Accessories'
    },
    {
        id: '5',
        name: 'Leather Crossbody Bag',
        price: 120.00,
        description: 'Compact leather bag perfect for everyday essentials.',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
        category: 'Accessories'
    },
    {
        id: '6',
        name: 'Summer Linen Dress',
        price: 75.00,
        description: 'Lightweight and breathable linen dress for warm days.',
        image: 'https://images.unsplash.com/photo-1515347619152-472093ce61a6?auto=format&fit=crop&w=800&q=80',
        category: 'Dresses'
    }
];
