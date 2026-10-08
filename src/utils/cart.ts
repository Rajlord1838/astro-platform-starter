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
    // Dispatch custom event so React components can update
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
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
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
};

export const updateQuantity = (productId: string, quantity: number) => {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        item.quantity = quantity;
        saveCart(cart);
    }
};

export const clearCart = () => {
    saveCart([]);
};

export const toggleCartModal = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('toggle-cart'));
    }
};
