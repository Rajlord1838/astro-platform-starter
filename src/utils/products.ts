export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Classic White T-Shirt",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        category: "Tops"
    },
    {
        id: "2",
        name: "Denim Jacket",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800",
        category: "Outerwear"
    },
    {
        id: "3",
        name: "Slim Fit Jeans",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1542272604-780c8d52a5ce?auto=format&fit=crop&q=80&w=800",
        category: "Bottoms"
    },
    {
        id: "4",
        name: "Floral Summer Dress",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
        category: "Dresses"
    },
    {
        id: "5",
        name: "Leather Crossbody Bag",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
        category: "Accessories"
    },
    {
        id: "6",
        name: "Chunky Knit Sweater",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800",
        category: "Tops"
    }
];
