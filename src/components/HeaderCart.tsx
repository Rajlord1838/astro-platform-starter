import React, { useState } from 'react';
import { CartButton } from './CartButton';
import { CartModal } from './CartModal';

export const HeaderCart: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="ml-auto">
            <CartButton onClick={() => setIsCartOpen(true)} />
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};