import type { CartItem, Product } from '../types';

export const CART_STORAGE_KEY = 'fashion_store_cart';
export const CART_UPDATED_EVENT = 'cart-updated';

export const getCartItems = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const saveCartItems = (items: CartItem[]) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
};

export const addToCart = (product: Product, quantity: number = 1) => {
    const items = getCartItems();
    const existing = items.find((item) => item.id === product.id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        items.push({ ...product, quantity });
    }

    saveCartItems(items);
};

export const updateQuantity = (productId: string, quantity: number) => {
    const items = getCartItems();
    const item = items.find((item) => item.id === productId);

    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCartItems(items);
    }
};

export const removeFromCart = (productId: string) => {
    const items = getCartItems();
    const updated = items.filter((item) => item.id !== productId);
    saveCartItems(updated);
};
