export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic White Tee",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    description: "A comfortable, everyday essential white t-shirt made from 100% organic cotton."
  },
  {
    id: "2",
    name: "Denim Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1551028719-0c141d65d492?auto=format&fit=crop&q=80&w=800",
    description: "Vintage wash denim jacket with a relaxed fit. Perfect for layering."
  },
  {
    id: "3",
    name: "Summer Floral Dress",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
    description: "Lightweight midi dress with a subtle floral print and adjustable straps."
  },
  {
    id: "4",
    name: "Leather Crossbody Bag",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
    description: "Genuine leather crossbody bag with multiple compartments and gold-tone hardware."
  },
  {
    id: "5",
    name: "Classic Sneakers",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
    description: "Minimalist white sneakers with a durable rubber sole for all-day comfort."
  },
  {
    id: "6",
    name: "Tailored Chinos",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800",
    description: "Versatile chino pants with a modern tailored fit, perfect for work or weekends."
  }
];
