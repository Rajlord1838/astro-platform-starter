import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
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

export const removeFromCart = (productId: string) => {
    const cart = getCart();
    const newCart = cart.filter(item => item.product.id !== productId);
    saveCart(newCart);
};

export const updateQuantity = (productId: string, quantity: number) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === productId);

    if (existingItem) {
        if (quantity > 0) {
            existingItem.quantity = quantity;
        } else {
            return removeFromCart(productId);
        }
    }

    saveCart(cart);
};
