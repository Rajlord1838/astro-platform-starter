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
    title: string;
    price: number;
    image: string;
    description: string;
}

export interface CartItem extends Product {
    quantity: number;
}