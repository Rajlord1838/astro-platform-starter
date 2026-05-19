export interface CartItem {
    id: string;
    quantity: number;
}

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const cartStr = localStorage.getItem('shopping-cart');
    if (!cartStr) return [];
    try {
        return JSON.parse(cartStr) as CartItem[];
    } catch (e) {
        console.error('Error parsing cart from localStorage', e);
        return [];
    }
};

export const addToCart = (productId: string, quantity: number = 1) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }

    localStorage.setItem('shopping-cart', JSON.stringify(cart));

    // Dispatch a custom event so other components (like Cart) can update
    window.dispatchEvent(new Event('cart-updated'));
};

export const getCartItemCount = (): number => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
};
