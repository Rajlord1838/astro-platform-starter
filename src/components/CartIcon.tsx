import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCartCount, onCartUpdate } from '../utils/cart';

const CartIcon: React.FC = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Initial load
        setCount(getCartCount());

        // Listen for updates
        const unsubscribe = onCartUpdate(() => {
            setCount(getCartCount());
        });

        return unsubscribe;
    }, []);

    const handleOpenCart = () => {
        // Dispatch a custom event to open the cart modal
        window.dispatchEvent(new Event('open-cart'));
    };

    return (
        <button
            onClick={handleOpenCart}
            className="relative p-2 text-neutral-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-md"
            aria-label={`Shopping cart with ${count} items`}
        >
            <ShoppingCart className="w-6 h-6" />
            {count > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full min-w-[1.25rem]">
                    {count}
                </span>
            )}
        </button>
    );
};

export default CartIcon;
