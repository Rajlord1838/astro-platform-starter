import React, { useState, useEffect } from 'react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      try {
        const cartString = localStorage.getItem('fashion_store_cart');
        if (cartString) {
          setCartItems(JSON.parse(cartString));
        }
      } catch (e) {
        console.error("Error loading cart:", e);
      } finally {
        setIsLoaded(true);
      }
    };

    loadCart();
    window.addEventListener('cart-updated', loadCart);
    return () => window.removeEventListener('cart-updated', loadCart);
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem('fashion_store_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const removeItem = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.product.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('fashion_store_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (!isLoaded) {
    return <div className="py-12 text-center text-gray-500">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <a href="/" className="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>

          <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
            {cartItems.map((item) => (
              <li key={item.product.id} className="flex py-6 sm:py-10">
                <div className="shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <a href={`/product/${item.product.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                            {item.product.name}
                          </a>
                        </h3>
                      </div>
                      <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">{item.product.category}</p>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900">${item.product.price.toFixed(2)}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <label htmlFor={`quantity-${item.product.id}`} className="sr-only">
                        Quantity, {item.product.name}
                      </label>
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 border border-gray-300 rounded-l-md hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-t border-b border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 border border-gray-300 rounded-r-md hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>

                      <div className="absolute right-0 top-0">
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Remove</span>
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
            Order summary
          </h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">${total.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
              </dt>
              <dd className="text-sm font-medium text-gray-900">$5.00</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Tax estimate</span>
              </dt>
              <dd className="text-sm font-medium text-gray-900">${(total * 0.08).toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">Order total</dt>
              <dd className="text-base font-medium text-gray-900">${(total + 5 + (total * 0.08)).toFixed(2)}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
