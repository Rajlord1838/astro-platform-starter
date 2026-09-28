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
        id: '1',
        name: 'Classic White T-Shirt',
        price: 29.99,
        description: 'A timeless classic. Made from 100% organic cotton.',
        image: 'https://placehold.co/400x500?text=White+T-Shirt',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        price: 89.99,
        description: 'Vintage wash denim jacket with a relaxed fit.',
        image: 'https://placehold.co/400x500?text=Denim+Jacket',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Black Skinny Jeans',
        price: 59.99,
        description: 'Stretch denim for maximum comfort and style.',
        image: 'https://placehold.co/400x500?text=Skinny+Jeans',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Summer Dress',
        price: 49.99,
        description: 'Light and airy floral print dress, perfect for summer days.',
        image: 'https://placehold.co/400x500?text=Summer+Dress',
        category: 'Dresses'
    },
    {
        id: '5',
        name: 'Leather Sneakers',
        price: 79.99,
        description: 'Minimalist white leather sneakers. Versatile and durable.',
        image: 'https://placehold.co/400x500?text=Sneakers',
        category: 'Footwear'
    },
    {
        id: '6',
        name: 'Knit Sweater',
        price: 69.99,
        description: 'Cozy oversized knit sweater for chilly evenings.',
        image: 'https://placehold.co/400x500?text=Knit+Sweater',
        category: 'Tops'
    }
];
