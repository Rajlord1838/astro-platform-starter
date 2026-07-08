import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A comfortable, everyday essential white tee.',
        price: 25.0,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
        category: 'Shirts',
    },
    {
        id: '2',
        name: 'Denim Jacket',
        description: 'Vintage wash denim jacket with a relaxed fit.',
        price: 85.0,
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
        category: 'Outerwear',
    },
    {
        id: '3',
        name: 'Slim Fit Jeans',
        description: 'Classic blue denim jeans with a modern slim fit.',
        price: 60.0,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
        category: 'Pants',
    },
    {
        id: '4',
        name: 'Summer Floral Dress',
        description: 'Lightweight floral dress perfect for warm days.',
        price: 55.0,
        image: 'https://images.unsplash.com/photo-1572804013309-82a89b4f959c?auto=format&fit=crop&w=800&q=80',
        category: 'Dresses',
    },
    {
        id: '5',
        name: 'Leather Sneakers',
        description: 'Minimalist white leather sneakers.',
        price: 110.0,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
        category: 'Shoes',
    },
    {
        id: '6',
        name: 'Wool Blend Sweater',
        description: 'Cozy knit sweater for chilly evenings.',
        price: 75.0,
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
        category: 'Tops',
    }
];
