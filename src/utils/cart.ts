import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';
export const CART_UPDATED_EVENT = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to parse cart data from local storage', e);
        return [];
    }
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
};

export const addToCart = (product: Product) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    saveCart(cart);
};

export const updateQuantity = (productId: string, quantity: number) => {
    let cart = getCart();
    if (quantity <= 0) {
        cart = cart.filter(item => item.product.id !== productId);
    } else {
        const item = cart.find(item => item.product.id === productId);
        if (item) {
            item.quantity = quantity;
        }
    }
    saveCart(cart);
};

export const removeFromCart = (productId: string) => {
    updateQuantity(productId, 0);
};

export const clearCart = () => {
    saveCart([]);
};
