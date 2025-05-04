import React from 'react';

function getUpdateDate(){
  return new Date().getDate() + " " + new Date().toLocaleString('default', { month: 'long' }) + " " + new Date().getFullYear();
}
const TermsOfService: React.FC = () => (
  <section className="min-h-screen bg-[#030329] text-white py-20 px-4">

    <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Terms of Service</h1>
        <p className="text-gray-300 font-bold">{getUpdateDate()}</p>
      </div>
      <p className="mb-4 text-gray-200">These Terms of Service ("Terms") govern your use of the Neurolab website and services. By accessing or using our services, you agree to be bound by these Terms.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">1. Use of Services</h2>
      <ul className="list-disc ml-6 text-gray-300 mb-4">
        <li>You must be at least 18 years old to use our services.</li>
        <li>You agree to use our services only for lawful purposes.</li>
        <li>All content is provided for informational purposes only.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">2. User Responsibilities</h2>
      <ul className="list-disc ml-6 text-gray-300 mb-4">
        <li>You are responsible for maintaining the confidentiality of your account information.</li>
        <li>You agree to provide accurate and complete information when creating an account.</li>
        <li>You are responsible for all activities that occur under your account.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">3. Prohibited Activities</h2>
      <ul className="list-disc ml-6 text-gray-300 mb-4">
        <li>Using the services for any unlawful purpose or to solicit others to perform or participate in unlawful acts.</li>
        <li>Violating any international, federal, provincial, or state regulations, rules, laws, or local ordinances.</li>
        <li>Infringing upon or violating our intellectual property rights or the intellectual property rights of others.</li>
        <li>Uploading or transmitting viruses or any other type of malicious code.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">4. Intellectual Property</h2>
      <ul className="list-disc ml-6 text-gray-300 mb-4">
        <li>All content, trademarks, and data on this site are the property of NeuroLab or its licensors.</li>
        <li>You may not copy, reproduce, or distribute any content without permission.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">5. Disclaimers</h2>
      <p className="mb-4 text-gray-300">Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. NeuroLab does not warrant that the services will be uninterrupted, secure, or error-free.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">6. Limitation of Liability</h2>
      <p className="mb-4 text-gray-300">NeuroLab is not liable for any damages or losses resulting from your use of our services. To the maximum extent permitted by law, we disclaim all liability for any indirect, incidental, or consequential damages.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">7. Governing Law</h2>
      <p className="mb-4 text-gray-300">These Terms are governed by and construed in accordance with the laws of Rwanda, without regard to its conflict of law provisions.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">8. Termination</h2>
      <p className="mb-4 text-gray-300">We reserve the right to suspend or terminate your access to our services at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">9. Changes to Terms</h2>
      <p className="mb-4 text-gray-300">We may update these Terms from time to time. Continued use of our services after changes means you accept the new Terms.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">10. Contact Us</h2>
      <p className="text-gray-300">If you have any questions about these Terms, please contact us at <a href="mailto:info@neurolab.cc" className="text-blue-400 underline">info@neurolab.cc</a>.</p>
      <div className="flex items-center justify-center mt-8">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Return to site</button>
      </div>
    </div>
    <div className="flex items-center justify-center mt-8">
      <p className="text-gray-300">© 2025 Neurolab. All rights reserved.</p>
    </div>
  </section>
);

export default TermsOfService; 