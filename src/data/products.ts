export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export const products: Product[] = [
    {
        id: "prod_1",
        name: "Classic White T-Shirt",
        price: 29.99,
        description: "A premium cotton white t-shirt, perfect for everyday wear.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Tops"
    },
    {
        id: "prod_2",
        name: "Slim Fit Blue Jeans",
        price: 79.99,
        description: "Comfortable and stylish slim fit jeans with a classic blue wash.",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Bottoms"
    },
    {
        id: "prod_3",
        name: "Leather Moto Jacket",
        price: 199.99,
        description: "Genuine leather motorcycle jacket with silver hardware.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Outerwear"
    },
    {
        id: "prod_4",
        name: "Canvas Sneakers",
        price: 59.99,
        description: "Classic canvas sneakers that go with any outfit.",
        image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Footwear"
    },
    {
        id: "prod_5",
        name: "Knit Wool Sweater",
        price: 89.99,
        description: "Cozy knit sweater made from 100% merino wool.",
        image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Tops"
    },
    {
        id: "prod_6",
        name: "Tailored Chinos",
        price: 69.99,
        description: "Versatile chino pants for a smart-casual look.",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "Bottoms"
    }
];
