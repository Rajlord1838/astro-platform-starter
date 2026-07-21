export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
}

const CART_KEY = 'fashion_store_cart';
const EVENT_NAME = 'cart-updated';

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const cartStr = localStorage.getItem(CART_KEY);
        return cartStr ? JSON.parse(cartStr) : [];
    } catch (e) {
        console.error('Error reading cart from localStorage', e);
        return [];
    }
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch (e) {
        console.error('Error saving cart to localStorage', e);
    }
};

export const addToCart = (productId: string) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: crypto.randomUUID(), productId, quantity: 1 });
    }
    saveCart(cart);
};

export const removeFromCart = (id: string) => {
    const cart = getCart();
    const newCart = cart.filter(item => item.id !== id);
    saveCart(newCart);
};

export const updateQuantity = (id: string, quantity: number) => {
    const cart = getCart();
    const item = cart.find(item => item.id === id);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            item.quantity = quantity;
            saveCart(cart);
        }
    }
};

export const getCartTotalItems = (): number => {
    return getCart().reduce((total, item) => total + item.quantity, 0);
};

export const clearCart = () => {
    saveCart([]);
};
