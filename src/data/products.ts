export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: "prod_1",
    name: "Classic White Tee",
    description: "A comfortable and stylish classic white t-shirt made from 100% organic cotton.",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod_2",
    name: "Denim Jacket",
    description: "Vintage inspired denim jacket perfect for layering. Features metal button closures.",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod_3",
    name: "Slim Fit Jeans",
    description: "Premium denim slim fit jeans with a slight stretch for comfort.",
    price: 69.99,
    imageUrl: "https://images.unsplash.com/photo-1542272604-780c9685b5bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod_4",
    name: "Leather Crossbody Bag",
    description: "Minimalist genuine leather crossbody bag with adjustable strap.",
    price: 120.00,
    imageUrl: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod_5",
    name: "Summer Floral Dress",
    description: "Lightweight and flowy floral dress, perfect for warm summer days.",
    price: 54.99,
    imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod_6",
    name: "Canvas Sneakers",
    description: "Classic canvas sneakers that go with almost any casual outfit.",
    price: 45.00,
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }
];
