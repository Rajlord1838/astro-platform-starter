import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 25.00,
        description: 'A comfortable, 100% cotton white t-shirt.',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'T-Shirts'
    },
    {
        id: '2',
        name: 'Blue Denim Jacket',
        price: 85.00,
        description: 'A classic blue denim jacket for all seasons.',
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Black Skinny Jeans',
        price: 60.00,
        description: 'Comfortable and stylish black skinny jeans.',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Pants'
    },
    {
        id: '4',
        name: 'Cozy Gray Hoodie',
        price: 55.00,
        description: 'A warm and cozy gray hoodie perfect for chilly days.',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Hoodies'
    },
    {
        id: '5',
        name: 'Floral Summer Dress',
        price: 70.00,
        description: 'A light and breezy floral dress for summer.',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Dresses'
    },
    {
        id: '6',
        name: 'Leather Sneakers',
        price: 110.00,
        description: 'Sleek and comfortable white leather sneakers.',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Shoes'
    }
];
