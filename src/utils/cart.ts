import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const items = localStorage.getItem(CART_KEY);
        return items ? JSON.parse(items) : [];
    } catch (e) {
        console.error('Error reading cart from localStorage', e);
        return [];
    }
}

export function saveCartItems(items: CartItem[]) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
        window.dispatchEvent(new Event('cart-updated'));
    } catch (e) {
        console.error('Error saving cart to localStorage', e);
    }
}

export function addToCart(product: Product, quantity: number = 1) {
    const items = getCartItems();
    const existingItem = items.find((item) => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        items.push({ product, quantity });
    }

    saveCartItems(items);
}

export function updateCartQuantity(productId: string, quantity: number) {
    let items = getCartItems();
    if (quantity <= 0) {
        items = items.filter((item) => item.product.id !== productId);
    } else {
        const item = items.find((i) => i.product.id === productId);
        if (item) {
            item.quantity = quantity;
        }
    }
    saveCartItems(items);
}

export function removeFromCart(productId: string) {
    const items = getCartItems();
    const filteredItems = items.filter((item) => item.product.id !== productId);
    saveCartItems(filteredItems);
}

export function clearCart() {
    saveCartItems([]);
}

export function toggleCart(isOpen?: boolean) {
    if (typeof window !== 'undefined') {
        const event = new CustomEvent('toggle-cart', { detail: isOpen });
        window.dispatchEvent(event);
    }
}
