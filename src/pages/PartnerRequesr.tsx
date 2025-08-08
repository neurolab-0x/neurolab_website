import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from "../components/Header";
import FadeInSection from "../components/FadeInSection";
import api from '../config/api';

interface FormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  businessType: string;
  message: string;
}

interface FormErrors {
  companyName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  website?: string;
  businessType?: string;
  message?: string;
}

const PartnerRequestPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    businessType: '',
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

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.businessType) {
      newErrors.businessType = 'Business type is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await api.post('/partner-requests', formData);

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your partnership request! We will review your application and get back to you soon.'
      });

      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        website: '',
        businessType: '',
        message: ''
      });
    } catch (error: any) {
      let errorMessage = 'Sorry, something went wrong. Please try again later.';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
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
    <div className="min-h-screen bg-[#030329] relative overflow-hidden pt-5">
      <Header />

      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        {/* Floating circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <FadeInSection direction="up" delay={0.2}>
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block mb-6"
            >
              <span className="p-2 px-4 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 backdrop-blur-sm">
                🤝 Neurolab Partnership Program
              </span>
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Become Our Partner
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Join our network of trusted partners and help shape the future of EEG analysis technology.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection direction="up" delay={0.4}>
          <div className="max-w-4xl mx-auto">
            {submitStatus.type && (
              <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success'
                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className={`w-full px-6 py-4 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 backdrop-blur-xl transition-all ${errors.companyName ? 'border-red-500' : 'border-white/10'
                      }`}
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-red-400 text-sm">{errors.companyName}</p>
                  )}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="Contact Person"
                    className={`w-full px-6 py-4 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 backdrop-blur-xl transition-all ${errors.contactPerson ? 'border-red-500' : 'border-white/10'
                      }`}
                  />
                  {errors.contactPerson && (
                    <p className="mt-1 text-red-400 text-sm">{errors.contactPerson}</p>
                  )}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className={`w-full px-6 py-4 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 backdrop-blur-xl transition-all ${errors.email ? 'border-red-500' : 'border-white/10'
                      }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
                  )}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </div>

                <div className="relative group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={`w-full px-6 py-4 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 backdrop-blur-xl transition-all ${errors.phone ? 'border-red-500' : 'border-white/10'
                      }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-red-400 text-sm">{errors.phone}</p>
                  )}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </div>

                <div className="relative group">
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Company Website (Optional)"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 backdrop-blur-xl transition-all"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </div>

                <div className="relative group">
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 backdrop-blur-xl transition-all appearance-none ${errors.businessType ? 'border-red-500' : 'border-white/10'
                      }`}
                  >
                    <option value="" className="bg-[#030329]">Select Business Type</option>
                    <option value="healthcare" className="bg-[#030329]">Healthcare Provider</option>
                    <option value="technology" className="bg-[#030329]">Technology Company</option>
                    <option value="research" className="bg-[#030329]">Research Institution</option>
                    <option value="education" className="bg-[#030329]">Educational Institution</option>
                    <option value="other" className="bg-[#030329]">Other</option>
                  </select>
                  {errors.businessType && (
                    <p className="mt-1 text-red-400 text-sm">{errors.businessType}</p>
                  )}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </div>
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your organization and why you want to partner with us"
                  rows={4}
                  className={`w-full px-6 py-4 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 backdrop-blur-xl transition-all ${errors.message ? 'border-red-500' : 'border-white/10'
                    }`}
                />
                {errors.message && (
                  <p className="mt-1 text-red-400 text-sm">{errors.message}</p>
                )}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium text-lg 
                    hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                    transition-all transform hover:scale-105 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </div>
                  ) : 'Submit Partnership Request'}
                </button>
              </div>
            </form>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default PartnerRequestPage; 