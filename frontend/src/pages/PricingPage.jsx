// src/pages/PricingPage.jsx
import React from "react";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-6 py-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-8">Our Packages</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Standard</h2>
          <p className="text-gray-300 mb-4">Perfect for portraits & small events</p>
          <ul className="text-sm mb-6 space-y-2">
            <li>✅ 2-hour shoot</li>
            <li>✅ 15 edited photos</li>
            <li>✅ Online gallery access</li>
          </ul>
          <span className="text-lg font-bold text-purple-400">£150</span>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-purple-400">
          <h2 className="text-2xl font-semibold mb-4">Premium</h2>
          <p className="text-gray-300 mb-4">Best for weddings & full-day coverage</p>
          <ul className="text-sm mb-6 space-y-2">
            <li>✅ Full-day coverage</li>
            <li>✅ 100+ edited photos</li>
            <li>✅ USB + Online gallery</li>
          </ul>
          <span className="text-lg font-bold text-purple-400">£850</span>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Mini</h2>
          <p className="text-gray-300 mb-4">Quick & simple professional shoots</p>
          <ul className="text-sm mb-6 space-y-2">
            <li>✅ 30-minute shoot</li>
            <li>✅ 5 edited photos</li>
            <li>✅ Online delivery</li>
          </ul>
          <span className="text-lg font-bold text-purple-400">£80</span>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
