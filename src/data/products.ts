import type { Product } from '../types';

export const products: Product[] = [
    {
        id: 'p1',
        name: 'Classic White T-Shirt',
        description: 'A timeless classic white tee made from 100% organic cotton.',
        price: 29.99,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80',
        category: 'T-Shirts'
    },
    {
        id: 'p2',
        name: 'Denim Jacket',
        description: 'Vintage wash denim jacket with a comfortable fit.',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=500&q=80',
        category: 'Outerwear'
    },
    {
        id: 'p3',
        name: 'Slim Fit Jeans',
        description: 'Dark wash slim fit jeans with a slight stretch for comfort.',
        price: 59.99,
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80',
        category: 'Pants'
    },
    {
        id: 'p4',
        name: 'Floral Summer Dress',
        description: 'Light and airy floral dress perfect for warm summer days.',
        price: 49.99,
        imageUrl: 'https://images.unsplash.com/photo-1572804013309-82a891488c28?auto=format&fit=crop&w=500&q=80',
        category: 'Dresses'
    },
    {
        id: 'p5',
        name: 'Leather Sneakers',
        description: 'Minimalist white leather sneakers that go with everything.',
        price: 79.99,
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80',
        category: 'Shoes'
    },
    {
        id: 'p6',
        name: 'Cozy Knit Sweater',
        description: 'Chunky knit sweater to keep you warm and stylish.',
        price: 64.99,
        imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80',
        category: 'Sweaters'
    }
];
