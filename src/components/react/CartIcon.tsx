import React, { useEffect, useState } from 'react';
import { getCart, getCartItemsCount, CART_UPDATED_EVENT } from '../../utils/cart';

interface Props {
  onClick: () => void;
}

export const CartIcon: React.FC<Props> = ({ onClick }) => {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Initial load
    setItemCount(getCartItemsCount(getCart()));

    // Listen for updates
    const handleCartUpdate = () => {
      setItemCount(getCartItemsCount(getCart()));
    };

    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    return () => window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
  }, []);

  return (
    <button onClick={onClick} className="relative p-2 text-gray-700 hover:text-black focus:outline-none" aria-label="Open cart">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.076.721-.506 1.393-1.235 1.393H4.36m11.356-1.993a2 2 0 01-1.993 1.993m0 0a2 2 0 01-1.993-1.993m0 0l-1.263-12m-11.356 12l1.263-12c.076-.721.506-1.393 1.235-1.393h11.356" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  );
};
