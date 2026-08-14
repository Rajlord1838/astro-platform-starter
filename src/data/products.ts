export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Classic White Tee",
    price: 29.99,
    description: "A comfortable, everyday classic white t-shirt made from 100% organic cotton.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    category: "Tops"
  },
  {
    id: "p2",
    name: "Denim Jacket",
    price: 89.99,
    description: "Vintage-washed denim jacket with a relaxed fit. Perfect for layering.",
    image: "https://images.unsplash.com/photo-1551028719-01c1eb562145?auto=format&fit=crop&q=80&w=800",
    category: "Outerwear",
    isNew: true
  },
  {
    id: "p3",
    name: "Slim Fit Jeans",
    price: 59.99,
    description: "Classic slim fit jeans in a versatile dark indigo wash.",
    image: "https://images.unsplash.com/photo-1542272604-780c87853295?auto=format&fit=crop&q=80&w=800",
    category: "Bottoms"
  },
  {
    id: "p4",
    name: "Canvas Sneakers",
    price: 49.99,
    description: "Lightweight and durable canvas sneakers for everyday wear.",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800",
    category: "Shoes"
  },
  {
    id: "p5",
    name: "Leather Crossbody Bag",
    price: 129.99,
    description: "Minimalist leather crossbody bag with adjustable strap.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
    category: "Accessories",
    isNew: true
  },
  {
    id: "p6",
    name: "Linen Blend Shirt",
    price: 45.00,
    description: "Breathable linen blend button-down shirt, perfect for warm weather.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e32f0b484?auto=format&fit=crop&q=80&w=800",
    category: "Tops"
  }
];
