export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A timeless staple for any wardrobe. Made from 100% organic cotton for ultimate comfort and breathability.',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        description: 'Vintage-inspired denim jacket with a relaxed fit. Perfect for layering over any outfit.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Floral Summer Dress',
        description: 'Light and airy floral dress, ideal for warm summer days and outdoor gatherings.',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Dresses'
    },
    {
        id: '4',
        name: 'Leather Crossbody Bag',
        description: 'Minimalist leather crossbody bag with adjustable strap and brass hardware.',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Accessories'
    },
    {
        id: '5',
        name: 'High-Waisted Jeans',
        description: 'Classic high-waisted jeans with a straight-leg fit. Durable and stylish.',
        price: 75.00,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Bottoms'
    },
    {
        id: '6',
        name: 'Canvas Sneakers',
        description: 'Everyday canvas sneakers with a comfortable rubber sole. Essential footwear.',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Shoes'
    }
];