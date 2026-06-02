import type { Product } from '../data/products';

export interface CartItem extends Product {
    quantity: number;
}

const CART_KEY = 'fashion_store_cart';
export const CART_EVENT = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const item = window.localStorage.getItem(CART_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.warn('Error reading cart from localStorage', error);
        return [];
    }
};

const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event(CART_EVENT));
    } catch (error) {
        console.warn('Error saving cart to localStorage', error);
    }
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
