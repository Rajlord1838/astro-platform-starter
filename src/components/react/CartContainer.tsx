import React, { useState } from 'react';
import { CartIcon } from './CartIcon';
import { CartModal } from './CartModal';

export const CartContainer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CartIcon onClick={() => setIsModalOpen(true)} />
      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
