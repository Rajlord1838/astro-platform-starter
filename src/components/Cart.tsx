import React, { useState, useEffect } from 'react';

export default function Cart() {
    const [itemCount, setItemCount] = useState(0);

    const updateCartCount = () => {
        const cartStr = localStorage.getItem('cart');
        if (cartStr) {
            try {
                const cart = JSON.parse(cartStr);
                const count = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
                setItemCount(count);
            } catch (e) {
                console.error("Error parsing cart", e);
                setItemCount(0);
            }
        } else {
            setItemCount(0);
        }
    };

    useEffect(() => {
        updateCartCount();

        // Listen for the custom event
        window.addEventListener('cart-updated', updateCartCount);

        return () => {
            window.removeEventListener('cart-updated', updateCartCount);
        };
    }, []);

    return (
        <div className="relative inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-content text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {itemCount}
                </span>
            )}
        </div>
    );
}
