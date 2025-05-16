import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import ProjectsSection from "../components/ProjectsSection";
import TeamSection from "../components/TeamSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";
import Contact from "../components/contact";
import Footer from "../components/Footer";
import FadeInSection from "../components/FadeInSection";
import PartnerSection from "../components/PartnerSection";

const LandingPage: React.FC = () => {
  return (
    <div className="font-sans bg-gray-50">
      <Header />
      {/* Home/Hero Section */}
      <FadeInSection>
        <div id="home">
          <HeroSection />
        </div>
      </FadeInSection>

      {/* Services Section */}
      <FadeInSection>
        <div id="services">
          <ServicesSection />
        </div>
      </FadeInSection>

      {/* Projects/Products Section */}
      <FadeInSection>
        <div id="projects">
          <ProjectsSection />
        </div>
      </FadeInSection>

      {/* Team Section */}
      <FadeInSection>
        <div id="team">
          <TeamSection />
        </div>
      </FadeInSection>

      {/* Testimonials Section */}
      <FadeInSection>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
      </FadeInSection>

      { /* Partnerships Section */}
      <FadeInSection>
        <div id="partnerships">
          <PartnerSection/>
        </div>
      </FadeInSection>

      {/* FAQ Section */}
      <FadeInSection>
        <div id="faq">
          <FAQSection />
        </div>
      </FadeInSection>

      {/* Contact Section */}
      <FadeInSection>
        <div id="contact">
          <Contact />
        </div>
      </FadeInSection>

      {/* Footer */}
      <FadeInSection>
        <div id="footer">
          <Footer />
        </div>
      </FadeInSection>
    </div>
  );
};

export default LandingPage;
