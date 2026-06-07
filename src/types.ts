export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}
