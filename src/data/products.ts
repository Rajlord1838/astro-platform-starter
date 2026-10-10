import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 29.99,
        description: 'A timeless, comfortable white t-shirt made from 100% organic cotton. Perfect for everyday wear.',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        price: 89.99,
        description: 'Vintage-inspired denim jacket with a relaxed fit. Features classic button closures and multiple pockets.',
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Slim Fit Jeans',
        price: 59.99,
        description: 'Versatile slim-fit jeans with a slight stretch for comfort. Classic 5-pocket design in a dark wash.',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Floral Summer Dress',
        price: 79.99,
        description: 'Lightweight and breezy floral print dress. Ideal for warm weather with a flattering A-line silhouette.',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop',
        category: 'Dresses'
    },
    {
        id: '5',
        name: 'Leather Crossbody Bag',
        price: 120.00,
        description: 'Genuine leather crossbody bag with an adjustable strap. Minimalist design with enough room for essentials.',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
        category: 'Accessories'
    },
    {
        id: '6',
        name: 'Canvas Sneakers',
        price: 65.00,
        description: 'Classic low-top canvas sneakers. Comfortable and versatile, perfect for casual outings.',
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop',
        category: 'Shoes'
    }
];
