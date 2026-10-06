import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A timeless classic white t-shirt made from 100% organic cotton. Perfect for everyday wear.',
        price: 25,
        imageUrl: 'https://placehold.co/400x500/eeeeee/333333?text=White+T-Shirt',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        description: 'A stylish vintage wash denim jacket. Durable and comfortable for all seasons.',
        price: 89,
        imageUrl: 'https://placehold.co/400x500/eeeeee/333333?text=Denim+Jacket',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Black Skinny Jeans',
        description: 'Premium quality black skinny jeans with a comfortable stretch fit.',
        price: 65,
        imageUrl: 'https://placehold.co/400x500/eeeeee/333333?text=Black+Jeans',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Summer Floral Dress',
        description: 'A lightweight and breathable floral dress, perfect for summer outings.',
        price: 55,
        imageUrl: 'https://placehold.co/400x500/eeeeee/333333?text=Floral+Dress',
        category: 'Dresses'
    },
    {
        id: '5',
        name: 'Leather Crossbody Bag',
        description: 'A genuine leather crossbody bag with adjustable straps and multiple compartments.',
        price: 120,
        imageUrl: 'https://placehold.co/400x500/eeeeee/333333?text=Leather+Bag',
        category: 'Accessories'
    },
    {
        id: '6',
        name: 'Canvas Sneakers',
        description: 'Comfortable and durable canvas sneakers for casual everyday style.',
        price: 45,
        imageUrl: 'https://placehold.co/400x500/eeeeee/333333?text=Canvas+Sneakers',
        category: 'Footwear'
    }
];
