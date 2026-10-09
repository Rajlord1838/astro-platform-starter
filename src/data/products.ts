import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A timeless classic white t-shirt made from 100% organic cotton.',
        price: 25.00,
        image: 'https://placehold.co/400x500?text=White+T-Shirt',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        description: 'Vintage wash denim jacket with a relaxed fit.',
        price: 89.99,
        image: 'https://placehold.co/400x500?text=Denim+Jacket',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Black Skinny Jeans',
        description: 'Comfortable everyday skinny jeans with a bit of stretch.',
        price: 55.00,
        image: 'https://placehold.co/400x500?text=Black+Jeans',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Summer Floral Dress',
        description: 'Lightweight and breezy floral dress perfect for warm days.',
        price: 65.50,
        image: 'https://placehold.co/400x500?text=Floral+Dress',
        category: 'Dresses'
    },
    {
        id: '5',
        name: 'Leather Crossbody Bag',
        description: 'Compact genuine leather bag with adjustable strap.',
        price: 120.00,
        image: 'https://placehold.co/400x500?text=Leather+Bag',
        category: 'Accessories'
    },
    {
        id: '6',
        name: 'Canvas Sneakers',
        description: 'Classic low-top canvas sneakers in off-white.',
        price: 45.00,
        image: 'https://placehold.co/400x500?text=Canvas+Sneakers',
        category: 'Shoes'
    }
];
