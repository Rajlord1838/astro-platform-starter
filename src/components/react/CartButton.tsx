import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../../utils/cart';

export default function CartButton() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // Initialize from local storage
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setItemCount(count);

        // Listen for updates
        const handleCartUpdated = (event: CustomEvent) => {
            const updatedCart = event.detail;
            const newCount = updatedCart.reduce((total: number, item: any) => total + item.quantity, 0);
            setItemCount(newCount);
        };

        window.addEventListener('cart-updated', handleCartUpdated as EventListener);
        return () => window.removeEventListener('cart-updated', handleCartUpdated as EventListener);
    }, []);

    const toggleCart = () => {
        window.dispatchEvent(new Event('toggle-cart'));
    };

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-white hover:text-gray-300 transition-colors focus:outline-none"
            aria-label="Toggle Shopping Cart"
        >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/4 bg-primary rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
}
