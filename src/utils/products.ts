export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    featured: boolean;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A comfortable and versatile classic white t-shirt made from 100% organic cotton.',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Tops',
        featured: true
    },
    {
        id: '2',
        name: 'Denim Jacket',
        description: 'Vintage wash denim jacket perfect for layering. Features button closure and chest pockets.',
        price: 85.00,
        image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Outerwear',
        featured: true
    },
    {
        id: '3',
        name: 'Floral Summer Dress',
        description: 'Lightweight and breezy floral print dress, ideal for warm summer days.',
        price: 60.00,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Dresses',
        featured: true
    },
    {
        id: '4',
        name: 'Leather Crossbody Bag',
        description: 'Elegant leather crossbody bag with adjustable strap and gold-tone hardware.',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Accessories',
        featured: false
    },
    {
        id: '5',
        name: 'Slim Fit Jeans',
        description: 'Classic slim fit blue jeans with a slight stretch for comfort.',
        price: 70.00,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Bottoms',
        featured: true
    },
    {
        id: '6',
        name: 'Wool Blend Sweater',
        description: 'Cozy wool blend sweater in a neutral tone, perfect for chilly evenings.',
        price: 95.00,
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Tops',
        featured: false
    },
    {
        id: '7',
        name: 'Casual Sneakers',
        description: 'Everyday comfortable white sneakers that pair well with any outfit.',
        price: 80.00,
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Shoes',
        featured: false
    },
    {
        id: '8',
        name: 'Sunglasses',
        description: 'Classic aviator sunglasses with UV protection.',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Accessories',
        featured: false
    }
];

export const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};
