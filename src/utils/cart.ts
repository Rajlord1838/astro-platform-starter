import type { Product, CartItem } from "../types";

const CART_KEY = "fashion_store_cart";

export function getCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    try {
        const storedCart = localStorage.getItem(CART_KEY);
        if (storedCart) {
            return JSON.parse(storedCart);
        }
    } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
    }
    return [];
}

function saveCart(cart: CartItem[]) {
    if (typeof window !== "undefined") {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event("cart-updated"));
    }
}

export function addToCart(product: Product) {
    const cart = getCart();
    const existingItemIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    saveCart(cart);
}

export function removeFromCart(productId: string) {
    const cart = getCart();
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCart(newCart);
}

export function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const cart = getCart();
    const existingItemIndex = cart.findIndex((item) => item.product.id === productId);

    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity = quantity;
        saveCart(cart);
    }
}

export function clearCart() {
    saveCart([]);
}
