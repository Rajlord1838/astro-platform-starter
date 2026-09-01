import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cart-updated'));
    }
};

export const addToCart = (product: Product, quantity: number = 1) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    saveCart(cart);
};

export const removeFromCart = (productId: string) => {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.product.id !== productId);
    saveCart(updatedCart);
};

export const updateQuantity = (productId: string, quantity: number) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === productId);

    if (existingItem) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        existingItem.quantity = quantity;
        saveCart(cart);
    }
};

export const clearCart = () => {
    saveCart([]);
};
