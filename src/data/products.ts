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
    id: "p1",
    name: "Classic White T-Shirt",
    price: 29.99,
    description: "A comfortable, everyday essential white tee made from 100% organic cotton.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    category: "Tops"
  },
  {
    id: "p2",
    name: "Denim Jacket",
    price: 89.99,
    description: "Vintage-wash denim jacket with a relaxed fit. Perfect for layering.",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800",
    category: "Outerwear"
  },
  {
    id: "p3",
    name: "Slim Fit Jeans",
    price: 59.99,
    description: "Classic blue slim-fit jeans with a slight stretch for comfort.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    category: "Bottoms"
  },
  {
    id: "p4",
    name: "Floral Summer Dress",
    price: 69.99,
    description: "Light and breezy floral dress, perfect for warm weather and picnics.",
    image: "https://images.unsplash.com/photo-1572804013309-82a89b47afc2?auto=format&fit=crop&q=80&w=800",
    category: "Dresses"
  },
  {
    id: "p5",
    name: "Leather Boots",
    price: 129.99,
    description: "Durable leather ankle boots with a comfortable block heel.",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800",
    category: "Footwear"
  },
  {
    id: "p6",
    name: "Wool Beanie",
    price: 24.99,
    description: "Cozy ribbed knit wool beanie to keep you warm in winter.",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800",
    category: "Accessories"
  }
];
