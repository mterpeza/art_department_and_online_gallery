import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Checkout({ cart = [], removeFromCart, clearCart }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const totalItems = useMemo(() => cart.length, [cart.length]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      setStatusMessage("Please enter your name and email.");
      return;
    }
    setStatusMessage(
      "Checkout request submitted. This is a basic placeholder checkout page.",
    );
  };

  return (
    <section className="px-4 sm:px-6 py-8">
      <div className="max-w-3xl mx-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 sm:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Review your bag and submit your contact details.
        </p>

        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Bag Summary</h2>
          <p className="text-sm mb-3">Items: {totalItems}</p>

          {cart.length > 0 ? (
            <ul className="space-y-2 mb-4">
              {cart.map((item, index) => (
                <li
                  key={`${item?.id || item?.name || "item"}-${index}`}
                  className="flex items-center justify-between rounded border border-gray-200 dark:border-gray-700 px-3 py-2"
                >
                  <span className="text-sm">
                    {item?.name || `Item ${index + 1}`}
                  </span>
                  <button
                    type="button"
                    className="text-xs font-semibold px-2 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => removeFromCart?.(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Your bag is empty.
            </p>
          )}

          <button
            type="button"
            className="text-xs font-semibold px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => clearCart?.()}
            disabled={cart.length === 0}
          >
            Clear Bag
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-semibold mb-1"
              htmlFor="checkout-name"
            >
              Full Name
            </label>
            <input
              id="checkout-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold mb-1"
              htmlFor="checkout-email"
            >
              Email
            </label>
            <input
              id="checkout-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 rounded-md bg-[#ff4000] text-white font-semibold hover:brightness-95"
          >
            Submit Checkout
          </button>
        </form>

        {statusMessage ? (
          <p className="mt-4 text-sm text-emerald-700 dark:text-emerald-300">
            {statusMessage}
          </p>
        ) : null}

        <div className="mt-6">
          <Link
            to="/store"
            className="text-sm font-semibold underline decoration-[#ff4000] underline-offset-4"
          >
            Back to Store
          </Link>
        </div>
      </div>
    </section>
  );
}
