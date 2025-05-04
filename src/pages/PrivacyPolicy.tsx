import React from 'react';

function getCurrentUpdateDate(){
  return new Date().getDate() + " " + new Date().toLocaleString('default', { month: 'long' }) + " " + new Date().getFullYear();
}

const PrivacyPolicy: React.FC = () => (
  <section className="min-h-screen bg-[#030329] text-white py-20 px-4">
    <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-xl">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Privacy Policy</h1>
      <p className="mb-6 text-gray-300">Last updated: {getCurrentUpdateDate()}</p>
      <p className="mb-4 text-gray-200">This Privacy Policy explains how Neurolab ("we", "us", or "our") collects, uses, discloses, and protects your information when you use our website and services.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">1. Information We Collect</h2>
      <ul className="list-disc ml-6 text-gray-300 mb-4">
        <li>Personal identification information (name, email address, phone number, etc.)</li>
        <li>Usage data (IP address, browser type, device information, pages visited, etc.)</li>
        <li>Cookies and similar tracking technologies</li>
        <li>Any other information you provide via forms or communications</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 text-gray-300 mb-4">
        <li>To provide, operate, and maintain our services</li>
        <li>To improve, personalize, and expand our website and offerings</li>
        <li>To communicate with you, including for customer service and updates</li>
        <li>To process your requests and manage your account</li>
        <li>To comply with legal obligations</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">3. Cookies and Tracking Technologies</h2>
      <p className="mb-4 text-gray-300">We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can control cookies through your browser settings.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">4. Third-Party Services</h2>
      <p className="mb-4 text-gray-300">We may use third-party services (such as analytics providers) that collect, monitor, and analyze information to improve our service. These third parties have their own privacy policies.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">5. Data Security</h2>
      <p className="mb-4 text-gray-300">We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">6. Your Rights</h2>
      <ul className="list-disc ml-6 text-gray-300 mb-4">
        <li>Access, update, or delete your personal information</li>
        <li>Object to or restrict certain processing of your data</li>
        <li>Withdraw consent at any time (where applicable)</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">7. Data Retention</h2>
      <p className="mb-4 text-gray-300">We retain your personal information only as long as necessary for the purposes set out in this policy, unless a longer retention period is required or permitted by law.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">8. Changes to This Privacy Policy</h2>
      <p className="mb-4 text-gray-300">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">9. Contact Us</h2>
      <p className="text-gray-300">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href="mailto:info@neurolab.cc" className="text-blue-400 underline">info@neurolab.cc</a>.</p>
    </div>
    <div className="flex items-center justify-center mt-8">
      <a href="/">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Return to site</button>
      </a>
    </div>
    <div className="flex items-center justify-center mt-8">
      <p className="text-gray-300">© {new Date().getFullYear()} Neurolab. All rights reserved.</p>
    </div>
  </section>
);

export default PrivacyPolicy; 