export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    category: "Shirts",
    description: "A comfortable, classic white t-shirt perfect for everyday wear."
  },
  {
    id: "2",
    name: "Denim Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800",
    category: "Outerwear",
    description: "Timeless denim jacket that goes with everything."
  },
  {
    id: "3",
    name: "Slim Fit Jeans",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1542272604-780c8dff63b2?auto=format&fit=crop&q=80&w=800",
    category: "Pants",
    description: "Comfortable slim fit jeans with a slight stretch."
  },
  {
    id: "4",
    name: "Casual Sneakers",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
    category: "Shoes",
    description: "Everyday casual sneakers for any occasion."
  },
  {
    id: "5",
    name: "Leather Belt",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    category: "Accessories",
    description: "Genuine leather belt with classic buckle."
  },
  {
    id: "6",
    name: "Summer Dress",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1515347619152-1662982d61d8?auto=format&fit=crop&q=80&w=800",
    category: "Dresses",
    description: "Light and breezy summer dress."
  }
];
