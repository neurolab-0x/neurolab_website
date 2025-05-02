import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import WhyUs from "../components/WhyChooseUs";
import TeamSection from "../components/TeamSection";
import PartnerSection from "../components/PartnerSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";
import FadeInSection from "../components/FadeInSection";
import Contact from "../components/contact";
import Footer from "../components/Footer";
import Downloads from "../components/Downloads";

const LandingPage: React.FC = () => {
  return (
    <div className="font-sans bg-gray-50">
      <Header />
      <FadeInSection>
        <div id="home">
          <HeroSection />
        </div>
      </FadeInSection>
      <FadeInSection>
        <div id="services">
          <ServicesSection />
        </div>
      </FadeInSection>
      <FadeInSection>
        <div id="why-us">
          <WhyUs />
        </div>
      </FadeInSection>
      <FadeInSection>
        <div id="team">
          <TeamSection />
        </div>
      </FadeInSection>
      <FadeInSection>
        <div id="partners">
          <PartnerSection />
        </div>
      </FadeInSection>
      <FadeInSection>
        <div id="download">
          <Downloads />
        </div>
      </FadeInSection>
      <FadeInSection>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
      </FadeInSection>
      <FadeInSection>
        <div id="faq">
          <FAQSection />
        </div>
      </FadeInSection>
      <FadeInSection>
        <div id="contact">
          <Contact />
        </div>
      </FadeInSection>
      <FadeInSection>
        <div id="footer">
          <Footer />
        </div>
      </FadeInSection>
    </div>
  );
};

export default LandingPage;
