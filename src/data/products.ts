import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White Tee',
        description: 'A comfortable and versatile classic white t-shirt.',
        price: 25.00,
        imageUrl: 'https://placehold.co/400x500/eeeeee/333333?text=White+Tee',
        category: 'Men'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        description: 'A stylish and durable denim jacket for any occasion.',
        price: 85.00,
        imageUrl: 'https://placehold.co/400x500/dddddd/333333?text=Denim+Jacket',
        category: 'Unisex'
    },
    {
        id: '3',
        name: 'Black Skinny Jeans',
        description: 'Sleek black skinny jeans that fit perfectly.',
        price: 60.00,
        imageUrl: 'https://placehold.co/400x500/cccccc/333333?text=Black+Jeans',
        category: 'Women'
    },
    {
        id: '4',
        name: 'Running Sneakers',
        description: 'Lightweight running sneakers with optimal support.',
        price: 120.00,
        imageUrl: 'https://placehold.co/400x500/bbbbbb/333333?text=Sneakers',
        category: 'Shoes'
    },
    {
        id: '5',
        name: 'Leather Belt',
        description: 'High-quality genuine leather belt.',
        price: 35.00,
        imageUrl: 'https://placehold.co/400x500/aaaaaa/333333?text=Leather+Belt',
        category: 'Accessories'
    },
    {
        id: '6',
        name: 'Summer Dress',
        description: 'A light and breezy floral summer dress.',
        price: 55.00,
        imageUrl: 'https://placehold.co/400x500/999999/333333?text=Summer+Dress',
        category: 'Women'
    }
];
