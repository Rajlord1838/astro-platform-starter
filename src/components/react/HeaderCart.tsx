import React, { useState } from 'react';
import { CartButton } from './CartButton';
import { CartSidebar } from './CartSidebar';

export const HeaderCart: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <CartButton onClick={() => setIsSidebarOpen(true)} />
            <CartSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </>
    );
};
