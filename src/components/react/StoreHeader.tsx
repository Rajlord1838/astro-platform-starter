import React, { useState } from 'react';
import { CartButton } from './CartButton';
import { CartModal } from './CartModal';

export const StoreHeader: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <CartButton onClick={() => setIsCartOpen(true)} />
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};
