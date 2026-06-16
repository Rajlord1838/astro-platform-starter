import type { Product, CartItem } from '../types';

const CART_KEY = 'fashion_store_cart';
const EVENT_NAME = 'cart-updated';

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    const savedCart = localStorage.getItem(CART_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
}

function saveCart(cart: CartItem[]) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: cart }));
    }
}

export function addToCart(product: Product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    saveCart(cart);
}

export function updateQuantity(productId: string, quantity: number) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.product.id === productId);

    if (itemIndex > -1) {
        if (quantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = quantity;
        }
        saveCart(cart);
    }
}

export function removeFromCart(productId: string) {
    updateQuantity(productId, 0);
}

export function subscribeToCart(callback: (cart: CartItem[]) => void) {
    if (typeof window === 'undefined') return () => {};

    const handler = (e: Event) => {
        const customEvent = e as CustomEvent<CartItem[]>;
        callback(customEvent.detail);
    };

    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
}