import React from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const addToCart = () => {
        const cartStr = localStorage.getItem('cart');
        let cart = [];
        if (cartStr) {
            try {
                cart = JSON.parse(cartStr);
            } catch (e) {
                cart = [];
            }
        }

        const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Dispatch custom event so other components (like Cart) can update
        window.dispatchEvent(new Event('cart-updated'));
    };

    return (
        <button
            onClick={addToCart}
            className="w-full mt-4 btn"
        >
            Add to Cart
        </button>
    );
}
