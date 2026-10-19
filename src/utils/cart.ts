export interface CartItem {
  productId: string;
  quantity: number;
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('fashion_store_cart');
  return cart ? JSON.parse(cart) : [];
}

export function addToCart(productId: string, quantity: number = 1) {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.productId === productId);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
  toggleCart(true);
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter(item => item.productId !== productId);
  localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const item = cart.find(item => item.productId === productId);
  if (item) {
    item.quantity = quantity;
    localStorage.setItem('fashion_store_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  }
}

export function clearCart() {
  localStorage.removeItem('fashion_store_cart');
  window.dispatchEvent(new Event('cart-updated'));
}

export function toggleCart(open?: boolean) {
  window.dispatchEvent(new CustomEvent('toggle-cart', { detail: { open } }));
}
