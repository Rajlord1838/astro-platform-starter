export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'men' | 'women' | 'accessories';
    image: string;
}
