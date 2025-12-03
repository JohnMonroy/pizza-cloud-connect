import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

// Import images as ES6 modules
import heroImage from '@/assets/hero-pizza.jpg';
import pizzaMargherita from '@/assets/pizza-margherita.jpg';
import pizzaPepperoni from '@/assets/pizza-pepperoni.jpg';
import pizzaQuattroFormaggi from '@/assets/pizza-quattro-formaggi.jpg';
import pizzaProsciutto from '@/assets/pizza-prosciutto.jpg';
import pizzaVegetariana from '@/assets/pizza-vegetariana.jpg';
import pizzaDiavola from '@/assets/pizza-diavola.jpg';

// Map pizza IDs to images - ready for AWS S3 integration
const pizzaImages: Record<string, string> = {
  '1': pizzaMargherita,
  '2': pizzaPepperoni,
  '3': pizzaQuattroFormaggi,
  '4': pizzaProsciutto,
  '5': pizzaVegetariana,
  '6': pizzaDiavola,
};

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero heroImage={heroImage} />
      <MenuSection pizzaImages={pizzaImages} />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
