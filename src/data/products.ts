export interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    imageUrl: string;
    description: string;
}

export const products: Product[] = [
    {
        id: '1',
        title: 'Classic White Tee',
        price: 25,
        category: 'Tops',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        description: 'A timeless essential. Made from 100% organic cotton for ultimate comfort.'
    },
    {
        id: '2',
        title: 'Denim Jacket',
        price: 85,
        category: 'Outerwear',
        imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        description: 'Vintage wash denim jacket with classic styling and durable hardware.'
    },
    {
        id: '3',
        title: 'Slim Fit Jeans',
        price: 60,
        category: 'Bottoms',
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        description: 'Premium stretch denim for a perfect slim fit without compromising comfort.'
    },
    {
        id: '4',
        title: 'Canvas Sneakers',
        price: 55,
        category: 'Shoes',
        imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        description: 'Lightweight and breathable. Your go-to shoes for everyday wear.'
    },
    {
        id: '5',
        title: 'Wool Beanie',
        price: 20,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        description: 'Keep warm in style with this ribbed knit wool blend beanie.'
    },
    {
        id: '6',
        title: 'Leather Belt',
        price: 35,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        description: 'Genuine full-grain leather belt with a solid brass buckle.'
    }
];
