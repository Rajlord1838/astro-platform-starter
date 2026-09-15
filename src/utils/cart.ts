import type { Product, CartItem } from '../types';

const CART_STORAGE_KEY = 'fashion_store_cart';

export function getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    const items = localStorage.getItem(CART_STORAGE_KEY);
    return items ? JSON.parse(items) : [];
}

export function addToCart(product: Product) {
    if (typeof window === 'undefined') return;
    const items = getCartItems();
    const existingItem = items.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        items.push({ product, quantity: 1 });
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('cart-updated'));
}

export function updateQuantity(productId: string, quantity: number) {
    if (typeof window === 'undefined') return;
    let items = getCartItems();

    if (quantity <= 0) {
        items = items.filter(item => item.product.id !== productId);
    } else {
        const item = items.find(item => item.product.id === productId);
        if (item) {
            item.quantity = quantity;
        }
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('cart-updated'));
}

export function clearCart() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CART_STORAGE_KEY);
    window.dispatchEvent(new Event('cart-updated'));
}
