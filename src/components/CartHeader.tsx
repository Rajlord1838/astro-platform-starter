import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CartHeader() {
    const [itemCount, setItemCount] = useState(0);

    const updateItemCount = () => {
        const cartStr = localStorage.getItem('fashion_store_cart');
        if (cartStr) {
            try {
                const cartItems = JSON.parse(cartStr);
                const count = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
                setItemCount(count);
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        } else {
            setItemCount(0);
        }
    };

    useEffect(() => {
        updateItemCount();
        const handleCartUpdate = () => {
            updateItemCount();
        };
        window.addEventListener('cart-updated', handleCartUpdate);
        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
        };
    }, []);

    const openCart = () => {
        const event = new CustomEvent('open-cart');
        window.dispatchEvent(event);
    };

    return (
        <button
            onClick={openCart}
            className="relative flex items-center p-2 text-white transition-opacity hover:opacity-80 cursor-pointer"
            aria-label="Open cart"
        >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
