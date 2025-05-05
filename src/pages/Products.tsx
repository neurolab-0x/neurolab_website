import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { FaArrowCircleLeft, FaExternalLinkAlt } from 'react-icons/fa';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const handleLearnMore = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const toggleProductComparison = (productId: number) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length < 3) {
        return [...prev, productId];
      }
      return prev;
    });
  };

  const comparedProducts = products.filter(p => selectedProducts.includes(p.id));

  return (
    <div className="font-sans bg-[#030329] text-white min-h-screen">
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div className='flex items-center justify-between gap-2 border-b p-2 bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 mb-8 border border-white/10' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className='flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-800/50 rounded-lg transition-all duration-300' onClick={() => navigate('/')}>
              <FaArrowCircleLeft size={32} />
              <span className="text-xl font-medium">Return to home</span>
            </div>
            <div className='flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-800/50 rounded-lg transition-all duration-300' onClick={() => window.open('https://web.neurolab.cc/products', '_blank')}>
              <span className='text-xl font-medium'>Continue to app</span>
              <FaExternalLinkAlt size={32} />
            </div>
          </motion.div>
          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 mb-8 border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-800">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-24 px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min"
                  />
                  <span className="text-gray-300">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-24 px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Max"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  {showComparison ? 'Hide Comparison' : 'Compare Products'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gray-900/50 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10"
              >
                <div className="h-48 bg-gray-800 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProducts.includes(product.id) && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                    <span className="px-2 py-1 text-sm font-medium text-blue-400 bg-blue-400/10 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-300">{product.description}</p>
                  <div className="mt-4">
                    <div className="text-sm text-gray-400">
                      <p>Channels: {product.specifications.channels}</p>
                      <p>Sampling Rate: {product.specifications.samplingRate}</p>
                      <p>Resolution: {product.specifications.resolution}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">${product.price}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleProductComparison(product.id)}
                        className="px-3 py-1 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
                      >
                        {selectedProducts.includes(product.id) ? 'Remove' : 'Compare'}
                      </button>
                      <button
                        onClick={() => handleLearnMore(product.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Comparison Modal */}
          <AnimatePresence>
            {showComparison && selectedProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gray-900 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Product Comparison</h2>
                    <button
                      onClick={() => setShowComparison(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {comparedProducts.map(product => (
                      <div key={product.id} className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                        <div className="space-y-2 text-sm text-gray-300">
                          <p><span className="font-medium">Price:</span> ${product.price}</p>
                          <p><span className="font-medium">Channels:</span> {product.specifications.channels}</p>
                          <p><span className="font-medium">Sampling Rate:</span> {product.specifications.samplingRate}</p>
                          <p><span className="font-medium">Resolution:</span> {product.specifications.resolution}</p>
                          <p><span className="font-medium">Connectivity:</span> {product.specifications.connectivity.join(', ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products; 