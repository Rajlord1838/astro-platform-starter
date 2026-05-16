export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'men' | 'women' | 'accessories';
    imageUrl: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A comfortable, everyday classic white t-shirt made from 100% cotton.',
        price: 25.00,
        category: 'men',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        description: 'A versatile denim jacket perfect for layering. Features button closure and multiple pockets.',
        price: 89.99,
        category: 'women',
        imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: '3',
        name: 'Leather Watch',
        description: 'An elegant watch with a genuine leather strap and minimalist dial.',
        price: 120.00,
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: '4',
        name: 'Slim Fit Jeans',
        description: 'Modern slim fit jeans with a slight stretch for comfort.',
        price: 65.00,
        category: 'men',
        imageUrl: 'https://images.unsplash.com/photo-1542272604-780c40fb3198?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: '5',
        name: 'Summer Floral Dress',
        description: 'A lightweight and breezy floral dress, perfect for warm days.',
        price: 55.00,
        category: 'women',
        imageUrl: 'https://images.unsplash.com/photo-1515347619362-73f47b2c5c0c?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: '6',
        name: 'Classic Sunglasses',
        description: 'Timeless sunglasses with UV protection.',
        price: 45.00,
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400'
    }
];
