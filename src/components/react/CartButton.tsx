import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, subscribeToCartChanges } from '../../utils/cart';

interface CartButtonProps {
    onClick: () => void;
}

export const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setItemCount(count);
        };

        // Initial fetch
        updateCount();

        // Subscribe to changes
        const unsubscribe = subscribeToCartChanges(updateCount);
        return unsubscribe;
    }, []);

    return (
        <button
            onClick={onClick}
            className="relative p-2 rounded-full hover:bg-slate-800 transition-colors group flex items-center justify-center"
            aria-label="Open Cart"
        >
            <ShoppingCart size={24} className="text-slate-200 group-hover:text-white transition-colors" />
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold px-1.5 py-0.5 min-w-[20px] text-center rounded-full border-2 border-[#1a1a1a]">
                    {itemCount > 99 ? '99+' : itemCount}
                </span>
            )}
        </button>
    );
};
