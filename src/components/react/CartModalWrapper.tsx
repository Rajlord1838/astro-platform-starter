import React, { useState, useEffect } from 'react';
import { CartModal } from './CartModal';

export const CartModalWrapper: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-cart-modal', handleOpen);
        return () => window.removeEventListener('open-cart-modal', handleOpen);
    }, []);

    return <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};
