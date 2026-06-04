import type { Product } from '../data/products';

export interface CartItem extends Product {
    quantity: number;
}

export const CART_STORAGE_KEY = 'fashion_store_cart';
export const CART_UPDATED_EVENT = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const cartStr = localStorage.getItem(CART_STORAGE_KEY);
        return cartStr ? JSON.parse(cartStr) : [];
    } catch (e) {
        console.error('Failed to parse cart from local storage', e);
        return [];
    }
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
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

export const clearCart = () => {
    saveCart([]);
};
