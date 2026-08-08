import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const cartStr = localStorage.getItem(CART_KEY);
        return cartStr ? JSON.parse(cartStr) : [];
    } catch (e) {
        return [];
    }
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    }
};

export const addToCart = (product: Product) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
};

export const removeFromCart = (productId: string) => {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
};

export const updateQuantity = (productId: string, quantity: number) => {
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity = Math.max(0, quantity);
        if (existingItem.quantity === 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    }
    saveCart(cart);
};