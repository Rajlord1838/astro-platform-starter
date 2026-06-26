import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export const getCartItems = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const item = window.localStorage.getItem(CART_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error('Error parsing cart items from local storage', error);
        return [];
    }
};

export const saveCartItems = (items: CartItem[]) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(CART_KEY, JSON.stringify(items));
        window.dispatchEvent(new Event('cart-updated'));
    } catch (error) {
        console.error('Error saving cart items to local storage', error);
    }
};

export const addToCart = (product: Product, quantity = 1) => {
    const items = getCartItems();
    const existingItem = items.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        items.push({ product, quantity });
    }

    saveCartItems(items);
};

export const removeFromCart = (productId: string) => {
    const items = getCartItems();
    const updatedItems = items.filter(item => item.product.id !== productId);
    saveCartItems(updatedItems);
};

export const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const items = getCartItems();
    const item = items.find(item => item.product.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCartItems(items);
    }
};

export const clearCart = () => {
    saveCartItems([]);
};
