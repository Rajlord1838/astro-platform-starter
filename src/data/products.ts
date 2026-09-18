import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A comfortable, everyday basic white tee made from 100% organic cotton.',
        price: 29.99,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        description: 'Vintage wash denim jacket with classic button styling and flap pockets.',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Slim Fit Jeans',
        description: 'Dark wash slim fit jeans with a slight stretch for all-day comfort.',
        price: 59.99,
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Leather Sneakers',
        description: 'Minimalist white leather sneakers that pair perfectly with any outfit.',
        price: 119.99,
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Footwear'
    },
    {
        id: '5',
        name: 'Knitted Sweater',
        description: 'Cozy oversized knitted sweater, perfect for cooler evenings.',
        price: 79.99,
        imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Tops'
    },
    {
        id: '6',
        name: 'Canvas Tote Bag',
        description: 'Durable canvas tote bag with reinforced handles and interior pocket.',
        price: 24.99,
        imageUrl: 'https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Accessories'
    }
];
