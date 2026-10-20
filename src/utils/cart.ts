import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
};

export const addToCart = (product: Product) => {
    const cart = getCart();
    const existing = cart.find((item) => item.product.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }
    saveCart(cart);
    toggleCart(true); // Open cart modal when item is added
};

export const removeFromCart = (productId: string) => {
    const cart = getCart();
    const updated = cart.filter((item) => item.product.id !== productId);
    saveCart(updated);
};

export const updateQuantity = (productId: string, quantity: number) => {
    const cart = getCart();
    const updated = cart.map((item) => {
        if (item.product.id === productId) {
            return { ...item, quantity: Math.max(0, quantity) };
        }
        return item;
    }).filter((item) => item.quantity > 0);
    saveCart(updated);
};

export const toggleCart = (isOpen?: boolean) => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('toggle-cart', { detail: isOpen }));
};