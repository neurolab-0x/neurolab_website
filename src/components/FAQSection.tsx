import FaqCard from "./FAQItem"
import FadeInSection from "./FadeInSection"
import { motion } from "framer-motion"

const FAQSection = () => {
  const faq = [
    {
      description: "What makes your EEG data processing unique?",
      icon: "+",
      explanation: "Our platform combines cutting-edge AI algorithms with advanced signal processing techniques to provide real-time EEG analysis, pattern recognition, and comprehensive brainwave visualization. We offer unparalleled accuracy and speed in processing complex neural data."
    },
    {
      description: "How accurate is your AI-based analysis?",
      icon: "+",
      explanation: "Our AI models achieve 99.9% accuracy in pattern recognition and classification. We continuously train our models with the latest research data and clinical findings to maintain this high standard of accuracy."
    },
    {
      description: "What types of EEG data can you process?",
      icon: "+",
      explanation: "We support various EEG data formats including raw time-series data, frequency domain analysis, and event-related potentials. Our platform can handle data from different EEG devices and sampling rates."
    },
    {
      description: "How secure is the data processing?",
      icon: "+",
      explanation: "We implement enterprise-grade security measures including end-to-end encryption, HIPAA compliance, and secure data storage. All data processing is performed in a secure environment with regular security audits."
    },
    {
      description: "Can I integrate this with my existing systems?",
      icon: "+",
      explanation: "Yes, our platform offers comprehensive API integration capabilities. We provide SDKs and documentation for seamless integration with existing healthcare systems, research databases, and clinical applications."
    }
  ]

  return (
    <section className="py-20 bg-[#030329] relative overflow-hidden">
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

      <div className="container mx-auto px-4 relative">
        <FadeInSection direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about our EEG data processing platform and its capabilities.
            </p>
          </div>
        </FadeInSection>

        <div className="max-w-4xl mx-auto space-y-4">
          {faq.map((item, index) => (
            <FadeInSection key={index} direction="up" delay={0.2 + index * 0.1}>
              <FaqCard
                description={item.description}
                icon={item.icon}
                explanation={item.explanation}
              />
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection