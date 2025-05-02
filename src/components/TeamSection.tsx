import FadeInSection from './FadeInSection';
import { motion } from 'framer-motion';
import Icon from './Icon';
import Card from './Card';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface TeamMember {
  name: string;
  role: string;
  expertise: string[];
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Uhirwe Esther Hope",
      role: "Co-Founder and UI/UX Designer",
      expertise: ["UI/UX Design", "User Research", "User Testing"],
      image: "/team/hope.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
      }
    },
    {
      name: "Mugisha Prosper",
      role: "Co-Founder and AI Research Director",
      expertise: ["Deep Learning", "Machine Learning", "Data Science"],
      image: "/team/polo.jpg",
      social: {
        twitter: "#",
        linkedin: "https://www.linkedin.com/in/mugisha-prosper-7a5981297/",
        github: "https://github.com/mugishaprosper",
      }
    },
    {
      name: "Asimwe Landry",
      role: "Founder and CEO",
      expertise: ["Marketing", "Sales", "Business Development"],
      image: "/team/landry.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/asimwe-landry-b23025354/",
        twitter: "#",
        github: "https://github.com/asimwe1",
      }
    },
    {
      name: "Dushimire Aine",
      role: "Co-Founder and Frontend Developer",
      expertise: ["Software Development", "System Architecture", "UI/UX Design"],
      image: "/team/aine.jpg",
      social: {
        twitter: "#",
        linkedin: "https://www.linkedin.com/in/dushimire-aine-732190351/",
        github: "https://github.com/aine1100",
      }
    },
    {
      name: "Atumanyire Winnie Darlen",
      role: "Marketing and Sales representative",
      expertise: ["Presentation Design", "UI/UX Design", "User Research"],
      image: "/team/winnie.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
      }
    }
  ];

  const getCardStyle = (index: number) => {
    const centerIndex = 2;
    const distanceFromCenter = index - centerIndex;
    const baseOffset = window.innerWidth < 768 ? 0 : 280; // No offset on mobile
    const zIndex = 5 - Math.abs(distanceFromCenter);
    const scale = window.innerWidth < 768 ? 1 : 1 - Math.abs(distanceFromCenter) * 0.05;

    return {
      transform: `translateX(${-distanceFromCenter * baseOffset}px) scale(${scale})`,
      zIndex,
      filter: `brightness(${1 - Math.abs(distanceFromCenter) * 0.15})`,
    };
  };

  const getHoverStyle = (index: number) => {
    const centerIndex = 2;
    const distanceFromCenter = index - centerIndex;
    const baseOffset = window.innerWidth < 768 ? 0 : 280; // No offset on mobile
    const scale = window.innerWidth < 768 ? 1 : 1 - Math.abs(distanceFromCenter) * 0.05;

    return {
      transform: `translateX(${-distanceFromCenter * baseOffset}px) translateY(-20px) scale(${scale})`,
      zIndex: 5 - Math.abs(distanceFromCenter),
      filter: `brightness(${1 - Math.abs(distanceFromCenter) * 0.15})`,
    };
  };

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
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Meet Our Team
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed tracking-wide px-4">
              Our team of high school students but with passion in neuroscience, AI and business.
            </p>
          </div>
        </FadeInSection>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="space-y-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  icon={<Icon name="user" size={32} />}
                  title={member.name}
                  description={member.role}
                  width="100%"
                  height="auto"
                  className="shadow-lg text-center relative"
                  iconClassName="mb-4"
                  titleClassName="text-xl font-bold mb-2 text-white tracking-tight"
                  descriptionClassName="text-blue-400 mb-4 leading-relaxed tracking-wide"
                >
                  <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-white/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2 mb-6">
                    {member.expertise.map((skill, i) => (
                      <div
                        key={i}
                        className="text-xs sm:text-sm text-gray-300 bg-gray-800/50 rounded-full px-3 py-1 text-center"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center items-center gap-4 mt-4">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-800/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                      >
                        <FaLinkedin size={16} />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-800/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                      >
                        <FaXTwitter size={16} />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-800/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                      >
                        <FaGithub size={16} />
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex justify-center items-center min-h-[700px] relative perspective-1000 overflow-visible mx-auto" style={{ maxWidth: '1400px' }}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="absolute w-[280px]"
              initial={false}
              animate={getCardStyle(index)}
              whileHover={getHoverStyle(index)}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <Card
                icon={<Icon name="user" size={32} />}
                title={member.name}
                description={member.role}
                width="100%"
                height="auto"
                className="shadow-lg text-center relative"
                iconClassName="mb-4"
                titleClassName="text-xl font-bold mb-2 text-white tracking-tight"
                descriptionClassName="text-blue-400 mb-4 leading-relaxed tracking-wide"
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 mb-6">
                  {member.expertise.map((skill, i) => (
                    <div
                      key={i}
                      className="text-sm text-gray-300 bg-gray-800/50 rounded-full px-3 py-1 text-center"
                    >
                      {skill}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center gap-4 mt-4">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                    >
                      <FaXTwitter size={20} />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 