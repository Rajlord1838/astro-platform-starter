export type BlobParameterProps = {
    seed: number;
    size: number;
    edges: number;
    growth: number;
    name: string;
    colors: string[];
};

export type BlobProps = {
    svgPath: string;
    parameters: BlobParameterProps;
};

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}
