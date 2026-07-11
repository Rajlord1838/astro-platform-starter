import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';
export const CART_UPDATED_EVENT = 'cart-updated';

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
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
};

export const addToCart = (product: Product, quantity = 1) => {
    const cart = getCart();
    const existingItemIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    saveCart(cart);
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

export const removeFromCart = (productId: string) => {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    saveCart(updatedCart);
};
