import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated'));
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
    const cart = getCart();
    const itemIndex = cart.findIndex((item) => item.product.id === productId);

    if (itemIndex > -1) {
        if (quantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = quantity;
        }
        saveCart(cart);
    }
};

export const getCartTotalItems = (): number => {
    return getCart().reduce((total, item) => total + item.quantity, 0);
};

export const getCartTotalPrice = (): number => {
    return getCart().reduce((total, item) => total + item.product.price * item.quantity, 0);
};
