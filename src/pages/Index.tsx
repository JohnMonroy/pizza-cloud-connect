import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

// AWS S3 bucket URL
const S3_BUCKET_URL = 'https://pizzeria-images-676127947384.s3.us-east-1.amazonaws.com';

// Hero image from S3
const heroImage = `${S3_BUCKET_URL}/hero-pizza.jpg`;

// Map pizza IDs to S3 images
const pizzaImages: Record<string, string> = {
  '1': `${S3_BUCKET_URL}/pizza-margherita.jpg`,
  '2': `${S3_BUCKET_URL}/pizza-pepperoni.jpg`,
  '3': `${S3_BUCKET_URL}/pizza-quattro-formaggi.jpg`,
  '4': `${S3_BUCKET_URL}/pizza-prosciutto.jpg`,
  '5': `${S3_BUCKET_URL}/pizza-vegetariana.jpg`,
  '6': `${S3_BUCKET_URL}/pizza-diavola.jpg`,
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
