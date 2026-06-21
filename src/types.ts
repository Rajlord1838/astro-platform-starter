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
    title: string;
    price: number;
    image: string;
    description: string;
};

export type CartItem = Product & {
    quantity: number;
};
