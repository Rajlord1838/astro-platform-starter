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
    price: 25,
    description: "A comfortable and stylish classic white t-shirt, perfect for any casual occasion.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Men"
  },
  {
    id: "2",
    name: "Denim Jacket",
    price: 85,
    description: "A timeless denim jacket that adds a cool edge to your outfit.",
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Unisex"
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    price: 55,
    description: "A breezy floral dress, ideal for warm summer days and beach outings.",
    image: "https://images.unsplash.com/photo-1572804013309-8c98e25e44ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Women"
  },
  {
    id: "4",
    name: "Leather Crossbody Bag",
    price: 120,
    description: "A chic leather crossbody bag with enough space for all your essentials.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Accessories"
  },
  {
    id: "5",
    name: "Slim Fit Chinos",
    price: 45,
    description: "Comfortable and versatile slim fit chinos for a smart-casual look.",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Men"
  },
  {
    id: "6",
    name: "Knitted Oversized Sweater",
    price: 65,
    description: "Stay warm and cozy with this oversized knitted sweater.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Women"
  }
];
