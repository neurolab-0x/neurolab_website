import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Neurologist",
      company: "King Faisal Hospital",
      image: "/team/sarah.jpg",
      review: "Neurolab's EEG analysis platform has revolutionized our diagnostic process. The AI-powered insights have significantly improved our accuracy and efficiency in detecting neurological conditions.",
      rating: 5
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Research Director",
      company: "Kanombe Hospital",
      image: "/team/michael.jpg",
      review: "The integration of NeuroLab's technology into our research workflow has been seamless. The platform's ability to process and analyze large datasets has accelerated our research significantly.",
      rating: 5
    },
    {
      name: "Dr. Awet Fesseha",
      role: "Software Engeneering Instructor",
      company: "Rwanda Coding Academy",
      image: "/team/awet.jpg",
      review: "The AI model cut our EEG data analysis time from days to minutes. What used to require a full research team now runs autonomously in real-time with surprising accuracy",
      rating: 5
    },
    {
      name: "Baziramwabo Gabriel",
      role: "Founder and CEO",
      company: "Benax Technologies",
      image: "/team/gabriel.jpg",
      review: "The system is fast, intuitive, and integrates well with our existing patient data. We’re looking at rolling it out across our neurodiagnostics unit.",
      rating: 5
    }
  ];

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
            <h2 className="text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Hear from medical professionals who have experienced the transformative power of Neurolab's technology.
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <FadeInSection key={index} direction="up" delay={0.2 + index * 0.1}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl"
                style={{
                  transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
                }}
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                      <p className="text-gray-300">{testimonial.role}</p>
                      <p className="text-sm text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.2 }}
                        className="text-yellow-400"
                      >
                        ★
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-gray-300 italic">"{testimonial.review}"</p>
                </div>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
