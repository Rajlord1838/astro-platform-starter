export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile essential for any wardrobe.",
    price: 25,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600&h=600",
    category: "T-Shirts"
  },
  {
    id: "prod-2",
    name: "Vintage Blue Jeans",
    description: "Premium denim with a relaxed fit and subtle distressing.",
    price: 85,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600&h=600",
    category: "Jeans"
  },
  {
    id: "prod-3",
    name: "Urban Sneakers",
    description: "Sleek, modern design with lightweight cushioning.",
    price: 120,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600&h=600",
    category: "Footwear"
  },
  {
    id: "prod-4",
    name: "Leather Biker Jacket",
    description: "Genuine leather jacket with asymmetrical zip closure.",
    price: 250,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600&h=600",
    category: "Outerwear"
  },
  {
    id: "prod-5",
    name: "Floral Summer Dress",
    description: "Lightweight midi dress perfect for warm days.",
    price: 65,
    imageUrl: "https://images.unsplash.com/photo-1515347619362-790176868840?auto=format&fit=crop&q=80&w=600&h=600",
    category: "Dresses"
  },
  {
    id: "prod-6",
    name: "Knitted Wool Sweater",
    description: "Cozy oversized sweater made from 100% merino wool.",
    price: 95,
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600&h=600",
    category: "Sweaters"
  }
];
