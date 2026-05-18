export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 25.0,
        description: 'A timeless classic white tee made from 100% organic cotton.',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '2',
        name: 'Denim Jacket',
        price: 89.99,
        description: 'Vintage wash denim jacket with a comfortable fit.',
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '3',
        name: 'Floral Summer Dress',
        price: 55.0,
        description: 'Lightweight and breezy floral dress perfect for summer days.',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '4',
        name: 'Black Leather Boots',
        price: 120.0,
        description: 'Genuine leather boots with a durable sole and stylish design.',
        image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '5',
        name: 'Slim Fit Chinos',
        price: 45.0,
        description: 'Comfortable slim fit chinos suitable for any casual occasion.',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '6',
        name: 'Wool Blend Coat',
        price: 150.0,
        description: 'Elegant wool blend coat to keep you warm and stylish.',
        image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=800&q=80',
    }
];
