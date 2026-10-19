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
    id: "1",
    name: "Classic White T-Shirt",
    price: 25.00,
    description: "A comfortable and versatile classic white t-shirt made from 100% organic cotton.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500",
    category: "Clothing"
  },
  {
    id: "2",
    name: "Denim Jacket",
    price: 85.00,
    description: "Timeless denim jacket with a vintage wash and durable construction.",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=500",
    category: "Clothing"
  },
  {
    id: "3",
    name: "Leather Sneaker",
    price: 120.00,
    description: "Premium leather sneakers with minimalist design and excellent support.",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=500",
    category: "Shoes"
  },
  {
    id: "4",
    name: "Wool Beanie",
    price: 22.00,
    description: "Warm and cozy wool beanie, perfect for cold winter days.",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=500",
    category: "Accessories"
  },
  {
    id: "5",
    name: "Canvas Tote Bag",
    price: 18.00,
    description: "Durable canvas tote bag for your everyday essentials.",
    image: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&q=80&w=500",
    category: "Accessories"
  },
  {
    id: "6",
    name: "Aviator Sunglasses",
    price: 55.00,
    description: "Classic aviator sunglasses with UV protection.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=500",
    category: "Accessories"
  }
];
