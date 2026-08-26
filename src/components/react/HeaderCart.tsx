import React, { useState } from 'react';
import { CartBadge } from './CartBadge';
import { CartModal } from './CartModal';

export const HeaderCart: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <CartBadge onClick={() => setIsModalOpen(true)} />
            <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
