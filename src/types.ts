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
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
}
