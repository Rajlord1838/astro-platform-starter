import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const storedCart = localStorage.getItem(CART_KEY);
        if (storedCart) {
            return JSON.parse(storedCart);
        }
    } catch (e) {
        console.error('Failed to parse cart from local storage', e);
    }
    return [];
}

function saveCartItems(items: CartItem[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('cart-updated'));
}

export function addToCart(product: Product) {
    const items = getCartItems();
    const existingItem = items.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        items.push({ product, quantity: 1 });
    }

    saveCartItems(items);
}

export function removeFromCart(productId: string) {
    const items = getCartItems();
    const newItems = items.filter(item => item.product.id !== productId);
    saveCartItems(newItems);
}

export function clearCart() {
    saveCartItems([]);
}

export function toggleCart() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('toggle-cart'));
    }
}
