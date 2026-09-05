export interface CartItem {
  productId: string;
  quantity: number;
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const cartJson = localStorage.getItem('fashion_store_cart');
  return cartJson ? JSON.parse(cartJson) : [];
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
}

export function addToCart(productId: string, quantity: number = 1) {
  const cart = getCart();
  const existingItemIndex = cart.findIndex((item) => item.productId === productId);

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  saveCart(cart);
}

export function removeFromCart(productId: string) {
  const cart = getCart();
  const newCart = cart.filter((item) => item.productId !== productId);
  saveCart(newCart);
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const cart = getCart();
  const item = cart.find((item) => item.productId === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
}
