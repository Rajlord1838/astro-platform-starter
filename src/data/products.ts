import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White Tee',
        description: 'A timeless essential. Made from 100% organic cotton for ultimate comfort and breathability.',
        price: 29.99,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        description: 'Vintage wash denim jacket with classic button detailing. Perfect for layering.',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'High-Waisted Jeans',
        description: 'Flattering high-waisted fit with a slight stretch for all-day comfort. Classic blue wash.',
        price: 69.99,
        imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Floral Summer Dress',
        description: 'Lightweight midi dress with a delicate floral print. Features adjustable straps and a flowy silhouette.',
        price: 59.99,
        imageUrl: 'https://images.unsplash.com/photo-1572804013309-8c98e25e448a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Dresses'
    },
    {
        id: '5',
        name: 'Leather Crossbody Bag',
        description: 'Minimalist leather bag with an adjustable strap. Enough space for your daily essentials.',
        price: 120.00,
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Accessories'
    },
    {
        id: '6',
        name: 'Canvas Sneakers',
        description: 'Comfortable everyday sneakers with a durable canvas upper and rubber sole.',
        price: 49.99,
        imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Shoes'
    }
];
