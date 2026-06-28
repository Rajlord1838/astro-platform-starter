import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem(CART_KEY);
    if (!cart) return [];
    try {
        return JSON.parse(cart);
    } catch (e) {
        return [];
    }
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
};

export const addToCart = (product: Product, quantity: number = 1) => {
    const cart = getCart();
    const existingItemIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    saveCart(cart);
};

export const removeFromCart = (productId: string) => {
    const cart = getCart();
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCart(newCart);
};

export const updateQuantity = (productId: string, quantity: number) => {
    const cart = getCart();
    const existingItemIndex = cart.findIndex((item) => item.product.id === productId);

    if (existingItemIndex > -1) {
        if (quantity <= 0) {
            cart.splice(existingItemIndex, 1);
        } else {
            cart[existingItemIndex].quantity = quantity;
        }
        saveCart(cart);
    }
};

export const clearCart = () => {
    saveCart([]);
};
