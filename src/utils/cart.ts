export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const cartStr = localStorage.getItem('cart');
        return cartStr ? JSON.parse(cartStr) : [];
    } catch (e) {
        console.error('Failed to parse cart from local storage', e);
        return [];
    }
}

export function addToCart(product: Product) {
    const cart = getCart();
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
}

export function removeFromCart(productId: string) {
    let cart = getCart();
    cart = cart.filter((item) => item.product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
}

export function updateQuantity(productId: string, quantity: number) {
    const cart = getCart();
    const item = cart.find((item) => item.product.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    }
}

export function clearCart() {
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cart-updated'));
}
