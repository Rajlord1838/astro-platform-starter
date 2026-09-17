import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'A timeless classic white t-shirt made from 100% organic cotton.',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Vintage wash denim jacket with a comfortable fit.',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Summer Floral Dress',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Light and airy floral dress perfect for summer days.',
        category: 'Dresses'
    },
    {
        id: '4',
        name: 'Slim Fit Jeans',
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Classic blue slim fit jeans with a slight stretch.',
        category: 'Bottoms'
    },
    {
        id: '5',
        name: 'Leather Sneakers',
        price: 119.99,
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Minimalist white leather sneakers for everyday wear.',
        category: 'Shoes'
    },
    {
        id: '6',
        name: 'Knit Sweater',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Cozy oversized knit sweater for chilly evenings.',
        category: 'Tops'
    }
];
