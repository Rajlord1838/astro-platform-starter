export interface CartItem {
    id: string;
    quantity: number;
}

const CART_KEY = 'fashion_store_cart';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to parse cart', e);
        return [];
    }
}

export function saveCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // Dispatch event so other components (like CartBadge) can update
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
}

export function addToCart(id: string) {
    const cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, quantity: 1 });
    }
    saveCart(cart);
}

export function removeFromCart(id: string) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
}

export function updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
        removeFromCart(id);
        return;
    }
    const cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity = quantity;
        saveCart(cart);
    }
}
