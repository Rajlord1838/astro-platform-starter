import type { CartItem, Product } from '../types';

const CART_KEY = 'fashion_store_cart';

export function getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];

    try {
        const storedCart = localStorage.getItem(CART_KEY);
        if (storedCart) {
            return JSON.parse(storedCart);
        }
    } catch (error) {
        console.error('Error reading cart from localStorage', error);
    }
    return [];
}

export function saveCartItems(items: CartItem[]): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
        // Dispatch custom event to notify other components (e.g., Header)
        window.dispatchEvent(new CustomEvent('cart-updated'));
    } catch (error) {
        console.error('Error saving cart to localStorage', error);
    }
}

export function addToCart(product: Product): void {
    const items = getCartItems();
    const existingItemIndex = items.findIndex((item) => item.id === product.id);

    if (existingItemIndex >= 0) {
        items[existingItemIndex].quantity += 1;
    } else {
        items.push({ ...product, quantity: 1 });
    }

    saveCartItems(items);
}

export function removeFromCart(productId: string): void {
    const items = getCartItems();
    const filteredItems = items.filter((item) => item.id !== productId);
    saveCartItems(filteredItems);
}

export function updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const items = getCartItems();
    const itemIndex = items.findIndex((item) => item.id === productId);

    if (itemIndex >= 0) {
        items[itemIndex].quantity = quantity;
        saveCartItems(items);
    }
}

export function clearCart(): void {
    saveCartItems([]);
}

export function toggleCart(): void {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('toggle-cart'));
    }
}
