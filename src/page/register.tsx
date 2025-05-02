import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RegisterForm from '../components/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030329] relative overflow-hidden">
      <Header />

      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Create Admin Account
            </span>
          </h1>
          <p className="text-gray-300">
            Register with your whitelisted email to create an admin account
          </p>
        </motion.div>

        <RegisterForm />
      </div>

      <Footer />
    </div>
  );
};

export default Register; 