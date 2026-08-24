import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../../utils/cart';

export default function CartBadge() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const cart = getCart();
            const total = cart.reduce((acc, item) => acc + item.quantity, 0);
            setCount(total);
        };

        updateCount();
        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    return (
        <div className="relative inline-flex items-center" aria-label="Cart">
            <ShoppingCart className="w-6 h-6 text-white" />
            {count > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-[20px] text-xs font-bold text-white bg-primary rounded-full px-1">
                    {count}
                </span>
            )}
        </div>
    );
}
