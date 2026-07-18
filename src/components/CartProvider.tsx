import React, { useState, useEffect } from 'react';
import CartModal from './CartModal';

export default function CartProvider() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        // Listen for requests to open the cart
        const handleOpenCart = (e: Event) => {
            e.preventDefault();
            setIsCartOpen(true);
        };

        const cartButton = document.getElementById('cart-button');
        if (cartButton) {
            cartButton.addEventListener('click', handleOpenCart);
        }

        return () => {
            if (cartButton) {
                cartButton.removeEventListener('click', handleOpenCart);
            }
        };
    }, []);

    return (
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    );
}
