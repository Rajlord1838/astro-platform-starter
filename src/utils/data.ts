export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Classic White T-Shirt",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        description: "A comfortable and stylish classic white t-shirt, perfect for any casual occasion."
    },
    {
        id: "2",
        name: "Denim Jacket",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800",
        description: "A timeless denim jacket that adds a cool edge to any outfit."
    },
    {
        id: "3",
        name: "Floral Summer Dress",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
        description: "A breezy floral dress perfect for warm summer days and outdoor parties."
    },
    {
        id: "4",
        name: "Leather Boots",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1608256246200-53e65329e3ed?auto=format&fit=crop&q=80&w=800",
        description: "Durable and stylish leather boots that will last you for years."
    },
    {
        id: "5",
        name: "Cozy Knit Sweater",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
        description: "Stay warm and comfortable in this soft knit sweater."
    },
    {
        id: "6",
        name: "Slim Fit Jeans",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
        description: "Classic slim fit jeans that pair well with anything."
    }
];

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}
