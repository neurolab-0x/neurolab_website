import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products, Product } from '../data/products';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="font-sans bg-[#030329] text-white min-h-screen">
        <Header />
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Product Not Found
            </h1>
            <button
              onClick={() => navigate('/products')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Back to Products
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans bg-[#030329] text-white min-h-screen">
      <Header />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/products')}
            className="mb-8 flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/50 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold text-white">{product.name}</h1>
                  <span className="px-3 py-1 text-sm font-medium text-blue-400 bg-blue-400/10 rounded-full">
                    {product.category}
                  </span>
                </div>
                <p className="mt-4 text-xl text-gray-300">{product.description}</p>
                <div className="mt-6">
                  <span className="text-3xl font-bold text-white">${product.price}</span>
                </div>
                <button className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Contact Sales
                </button>
              </div>
            </div>

            <div className="border-t border-white/10">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Technical Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Channels</h3>
                      <p className="mt-1 text-lg text-white">{product.specifications.channels}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Sampling Rate</h3>
                      <p className="mt-1 text-lg text-white">{product.specifications.samplingRate}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Resolution</h3>
                      <p className="mt-1 text-lg text-white">{product.specifications.resolution}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Connectivity</h3>
                      <p className="mt-1 text-lg text-white">{product.specifications.connectivity.join(', ')}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Power Requirements</h3>
                      <p className="mt-1 text-lg text-white">{product.specifications.power}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Dimensions</h3>
                      <p className="mt-1 text-lg text-white">{product.specifications.dimensions}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Weight</h3>
                      <p className="mt-1 text-lg text-white">{product.specifications.weight}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Compatibility</h2>
                <div className="flex flex-wrap gap-2">
                  {product.specifications.compatibility.map((platform) => (
                    <span
                      key={platform}
                      className="px-3 py-1 text-sm font-medium text-gray-300 bg-gray-800/50 rounded-full"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail; 