import type { Product, CartItem } from '../types';

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
};

export const removeFromCart = (productId: string) => {
    const cart = getCart();
    const updated = cart.filter((item) => item.product.id !== productId);
    saveCart(updated);
};

export const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const item = cart.find((item) => item.product.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
};

export const toggleCartModal = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('toggle-cart'));
    }
};

export const getCartTotal = (cart: CartItem[]) => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export const getCartCount = (cart: CartItem[]) => {
    return cart.reduce((count, item) => count + item.quantity, 0);
};
