import type { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 29.99,
        description: 'A comfortable, 100% cotton classic white t-shirt.',
        image: 'https://placehold.co/400x500/eaeaea/333333?text=White+T-Shirt',
        category: 'Men'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        price: 89.99,
        description: 'A stylish and durable denim jacket for any season.',
        image: 'https://placehold.co/400x500/eaeaea/333333?text=Denim+Jacket',
        category: 'Women'
    },
    {
        id: '3',
        name: 'Running Sneakers',
        price: 119.99,
        description: 'Lightweight running sneakers with superior cushioning.',
        image: 'https://placehold.co/400x500/eaeaea/333333?text=Running+Sneakers',
        category: 'Shoes'
    },
    {
        id: '4',
        name: 'Black Chino Pants',
        price: 49.99,
        description: 'Versatile black chinos suitable for both casual and formal wear.',
        image: 'https://placehold.co/400x500/eaeaea/333333?text=Black+Chinos',
        category: 'Men'
    },
    {
        id: '5',
        name: 'Summer Floral Dress',
        price: 59.99,
        description: 'A light, breezy floral dress perfect for summer days.',
        image: 'https://placehold.co/400x500/eaeaea/333333?text=Floral+Dress',
        category: 'Women'
    },
    {
        id: '6',
        name: 'Leather Messenger Bag',
        price: 149.99,
        description: 'Premium leather messenger bag with multiple compartments.',
        image: 'https://placehold.co/400x500/eaeaea/333333?text=Leather+Bag',
        category: 'Accessories'
    }
];
