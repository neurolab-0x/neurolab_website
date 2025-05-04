import React from 'react';

const Documentation: React.FC = () => (
  <section className="min-h-screen bg-[#030329] text-white py-20 px-4">
    <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-xl">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Documentation</h1>
      <p className="mb-6 text-gray-300">Welcome to the Neurolab documentation. Here you'll find guides, API references, and resources to help you get started and make the most of our platform.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Getting Started</h2>
      <ul className="list-disc ml-6 text-gray-300 mb-4">
        <li>Overview of the platform</li>
        <li>How to create an account</li>
        <li>Basic usage and navigation</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">API Reference</h2>
      <ul className="list-disc ml-6 text-gray-300 mb-4">
        <li>Authentication</li>
        <li>Endpoints and parameters</li>
        <li>Example requests and responses</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">More Resources</h2>
      <ul className="list-disc ml-6 text-gray-300 mb-4">
        <li>Troubleshooting</li>
        <li>Best practices</li>
        <li>Contact support for further help</li>
      </ul>
    </div>
  </section>
);

export default Documentation; 