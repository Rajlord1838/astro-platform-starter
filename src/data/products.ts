export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
        description: 'A timeless classic white t-shirt made from 100% organic cotton.'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800',
        description: 'Vintage wash denim jacket with a comfortable, relaxed fit.'
    },
    {
        id: '3',
        name: 'Slim Fit Jeans',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
        description: 'Classic blue slim fit jeans with a touch of stretch for comfort.'
    },
    {
        id: '4',
        name: 'Leather Sneakers',
        price: 119.99,
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800',
        description: 'Minimalist white leather sneakers suitable for any occasion.'
    },
    {
        id: '5',
        name: 'Wool Blend Coat',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=800',
        description: 'Elegant camel-colored coat made from a premium wool blend.'
    },
    {
        id: '6',
        name: 'Silk Scarf',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80&w=800',
        description: 'Beautifully patterned pure silk scarf to add a pop of color.'
    }
];
