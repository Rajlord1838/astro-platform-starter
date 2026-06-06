import type { Product, CartItem } from '../types';

export const CART_STORAGE_KEY = 'fashion_store_cart';
export const CART_UPDATED_EVENT = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
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
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    saveCart(updatedCart);
};

export const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const itemIndex = cart.findIndex((item) => item.product.id === productId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity = quantity;
        saveCart(cart);
    }
};

export const clearCart = () => {
    saveCart([]);
};

export const getCartTotal = (cart: CartItem[]): number => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export const getCartItemCount = (cart: CartItem[]): number => {
    return cart.reduce((count, item) => count + item.quantity, 0);
};
