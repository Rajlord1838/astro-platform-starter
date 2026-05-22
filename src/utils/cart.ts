export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const cartStr = localStorage.getItem('cart');
  if (!cartStr) return [];
  try {
    return JSON.parse(cartStr);
  } catch (e) {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
}

export function addToCart(product: Product) {
  const cart = getCart();
  const existing = cart.find(item => item.product.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  saveCart(cart);
}

export function removeFromCart(productId: string) {
  const cart = getCart();
  const index = cart.findIndex(item => item.product.id === productId);
  if (index > -1) {
    cart.splice(index, 1);
    saveCart(cart);
  }
}

export function clearCart() {
  saveCart([]);
}
