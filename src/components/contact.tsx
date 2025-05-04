import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FadeInSection from './FadeInSection';
import { FaBolt, FaShieldAlt, FaBrain, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaBuilding, FaGlobe, FaRegClock, FaLinkedin } from "react-icons/fa";
import api from '../config/api';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await api.post('/contacts', formData);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error: any) {
      let errorMessage = 'Sorry, something went wrong. Please try again later.';

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-[#030329] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        {/* Floating circles */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Title */}
        <FadeInSection direction="up" delay={0.1}>
          <h2 className="text-4xl font-bold text-white mb-14 tracking-tight text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Contact Us</span>
          </h2>
        </FadeInSection>
        <div className="w-full flex flex-col lg:flex-row gap-12 items-stretch min-h-[520px] lg:min-h-[420px]">
          {/* Left: Professional contact details */}
          <div className="lg:w-1/2 flex flex-col h-full">
            <FadeInSection direction="up" delay={0.2}>
              <div className="h-full flex flex-col">
                <div className="h-full flex flex-col justify-between p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl max-w-md w-full">
                  <h3 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-2">
                    <FaBuilding className="text-blue-400 text-2xl" /> Neurolab HQ
                  </h3>
                  <div className="flex flex-col gap-4 flex-1 justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center gap-3 text-gray-300 p-2">
                      <FaMapMarkerAlt className="text-blue-400 text-xl" />
                      <span>123 Innovation Avenue, Kigali, Rwanda</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 p-2">
                      <FaEnvelope className="text-blue-400 text-xl" />
                      <a href="mailto:info@neurolab.cc" className="hover:underline">info@neurolab.cc</a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 p-2">
                      <FaPhoneAlt className="text-blue-400 text-xl" />
                      <a href="tel:+250788123456" className="hover:underline">+250 788 123 456</a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 p-2">
                      <FaGlobe className="text-blue-400 text-xl" />
                      <a href="https://neurolab.cc" target="_blank" rel="noopener noreferrer" className="hover:underline">neurolab.cc</a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 p-2">
                      <FaRegClock className="text-blue-400 text-xl" />
                      <span>Office Hours: Anytime</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 p-2">
                      <FaLinkedin className="text-blue-400 text-xl" />
                      <a href="https://linkedin.com/company/neurolab" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                    </div>
                  </div>
                  <div />
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Right: Contact form */}
          <div className="lg:w-1/2 flex flex-col h-full">
            <div className="h-full flex flex-col justify-center max-w-2xl mx-auto">
              <FadeInSection direction="up" delay={0.4}>
                {submitStatus.type && (
                  <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                    }`}>
                    {submitStatus.message}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-8 h-full flex flex-col justify-between">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className={`w-full px-6 py-4 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 backdrop-blur-xl transition-all ${errors.name ? 'border-red-500' : 'border-white/10'
                          }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-red-400 text-sm">{errors.name}</p>
                      )}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                    </div>
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className={`w-full px-6 py-4 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 backdrop-blur-xl transition-all ${errors.email ? 'border-red-500' : 'border-white/10'
                          }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
                      )}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                    </div>
                  </div>
                  <div className="relative group">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      className={`w-full px-6 py-4 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 backdrop-blur-xl transition-all ${errors.subject ? 'border-red-500' : 'border-white/10'
                        }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-red-400 text-sm">{errors.subject}</p>
                    )}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                  <div className="relative group flex-1">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      rows={6}
                      className={`w-full px-6 py-4 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 backdrop-blur-xl transition-all resize-none ${errors.message ? 'border-red-500' : 'border-white/10'
                        }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-red-400 text-sm">{errors.message}</p>
                    )}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                  <div className="text-center">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold tracking-wide transition-all duration-200 shadow-lg hover:shadow-blue-500/25 ${isSubmitting
                        ? 'opacity-75 cursor-not-allowed'
                        : 'hover:from-blue-600 hover:to-purple-600'
                        }`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </div>
                </form>
              </FadeInSection>
            </div>
          </div>
        </div>
        {/* Info cards: full width below the two columns */}
        <FadeInSection direction="up" delay={0.6}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <motion.div
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <div className="inline-block p-4 bg-white/5 rounded-lg backdrop-blur-xl border border-white/10 mb-4 group-hover:border-blue-500/50 transition-colors">
                <FaBolt
                  size={24}
                  className="text-white group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Quick Response</h3>
              <p className="text-gray-400">We typically respond within 24 hours</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <div className="inline-block p-4 bg-white/5 rounded-lg backdrop-blur-xl border border-white/10 mb-4 group-hover:border-blue-500/50 transition-colors">
                <FaShieldAlt
                  size={24}
                  className="text-white group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure Communication</h3>
              <p className="text-gray-400">Your data is encrypted and protected</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <div className="inline-block p-4 bg-white/5 rounded-lg backdrop-blur-xl border border-white/10 mb-4 group-hover:border-blue-500/50 transition-colors">
                <FaBrain
                  size={24}
                  className="text-white group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Expert Support</h3>
              <p className="text-gray-400">Get help from our technical team</p>
            </motion.div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Contact;
