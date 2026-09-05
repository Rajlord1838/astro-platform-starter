export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    price: 29.99,
    description: "A comfortable and stylish classic white t-shirt, perfect for any casual occasion.",
    category: "Shirts",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    name: "Vintage Denim Jacket",
    price: 89.99,
    description: "High-quality denim jacket with a vintage wash.",
    category: "Outerwear",
    imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    name: "Slim Fit Jeans",
    price: 59.99,
    description: "Comfortable slim fit jeans with a slight stretch.",
    category: "Pants",
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    name: "Floral Summer Dress",
    price: 49.99,
    description: "Lightweight and breathable floral dress for summer days.",
    category: "Dresses",
    imageUrl: "https://images.unsplash.com/photo-1572804013309-82a89b436153?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    name: "Leather Crossbody Bag",
    price: 129.99,
    description: "Genuine leather crossbody bag with adjustable strap.",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "6",
    name: "Classic Sneakers",
    price: 79.99,
    description: "Versatile everyday sneakers with comfortable cushioning.",
    category: "Shoes",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];
