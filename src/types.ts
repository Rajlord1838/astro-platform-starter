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

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};

export type CartItem = {
    product: Product;
    quantity: number;
};
