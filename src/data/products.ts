export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 25,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'A timeless classic. Our white t-shirt is made from 100% organic cotton for ultimate comfort and breathability.',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Slim Fit Denim Jeans',
        price: 65,
        image: 'https://images.unsplash.com/photo-1542272604-780c8dfaf2dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'High-quality slim fit denim jeans with a slight stretch for all-day wear.',
        category: 'Bottoms'
    },
    {
        id: '3',
        name: 'Leather Biker Jacket',
        price: 150,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Genuine leather biker jacket featuring asymmetrical zip closure and silver hardware.',
        category: 'Outerwear'
    },
    {
        id: '4',
        name: 'Floral Summer Dress',
        price: 45,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Lightweight floral dress perfect for warm summer days.',
        category: 'Dresses'
    },
    {
        id: '5',
        name: 'Casual Canvas Sneakers',
        price: 55,
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Comfortable everyday canvas sneakers with durable rubber soles.',
        category: 'Shoes'
    },
    {
        id: '6',
        name: 'Wool Blend Coat',
        price: 120,
        image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Elegant wool blend coat to keep you warm and stylish during winter.',
        category: 'Outerwear'
    }
];

export const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
};
