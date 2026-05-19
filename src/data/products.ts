export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Classic White T-Shirt',
        description: 'A comfortable and versatile classic white t-shirt.',
        price: 25.0,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww'
    },
    {
        id: '2',
        name: 'Denim Jacket',
        description: 'A timeless denim jacket that goes with everything.',
        price: 80.0,
        image: 'https://images.unsplash.com/photo-1543076444-2abfaec97475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVuaW0lMjBqYWNrZXR8ZW58MHx8MHx8fDA='
    },
    {
        id: '3',
        name: 'Black Skinny Jeans',
        description: 'Stylish and form-fitting black skinny jeans.',
        price: 60.0,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amVhbnN8ZW58MHx8MHx8fDA='
    },
    {
        id: '4',
        name: 'Sneakers',
        description: 'Comfortable everyday sneakers.',
        price: 90.0,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8fDA='
    },
    {
        id: '5',
        name: 'Summer Dress',
        description: 'Light and breezy dress perfect for summer days.',
        price: 45.0,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHJlc3N8ZW58MHx8MHx8fDA='
    },
    {
        id: '6',
        name: 'Leather Handbag',
        description: 'An elegant leather handbag for any occasion.',
        price: 120.0,
        image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGFuZGJhZ3xlbnwwfHwwfHx8MA=='
    }
];
