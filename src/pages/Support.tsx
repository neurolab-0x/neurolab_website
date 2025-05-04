import React from 'react';

const Support: React.FC = () => (
  <section className="min-h-screen bg-[#030329] text-white py-20 px-4">
    <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-xl">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Support</h1>
      <p className="mb-6 text-gray-300">Need help? Our support team is here to assist you. Browse our FAQs or contact us directly for personalized support.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Frequently Asked Questions</h2>
      <ul className="list-disc ml-6 text-gray-300 mb-4">
        <li>How do I reset my password?</li>
        <li>How can I contact technical support?</li>
        <li>Where can I find user guides?</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Contact Support</h2>
      <ul className="list-disc ml-6 text-gray-300 mb-4">
        <li>Email: <a href="mailto:support@neurolab.cc" className="text-blue-400 underline">support@neurolab.cc</a></li>
        <li>Phone: <a href="tel:+250788123456" className="text-blue-400 underline">+250 788 123 456</a></li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Other Resources</h2>
      <ul className="list-disc ml-6 text-gray-300 mb-4">
        <li><a href="/documentation" className="text-blue-400 underline">Documentation</a></li>
        <li><a href="/faq" className="text-blue-400 underline">FAQ</a></li>
        <li>Community forums (coming soon)</li>
      </ul>
    </div>
  </section>
);

export default Support; 