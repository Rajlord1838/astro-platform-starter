import { useState, useEffect } from 'react';
import { getCartTotalItems } from '../utils/cart';
import { ShoppingCart } from 'lucide-react';

export default function CartIndicator() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        setItemCount(getCartTotalItems());

        const handleCartUpdate = () => {
            setItemCount(getCartTotalItems());
        };

        window.addEventListener('cart-updated', handleCartUpdate as EventListener);
        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
        };
    }, []);

    return (
        <a href="/cart" className="relative flex items-center justify-center p-2 transition-colors rounded-full hover:bg-gray-800">
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {itemCount}
                </span>
            )}
        </a>
    );
}
