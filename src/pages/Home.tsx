import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Specialties from '@/components/home/Specialties';
import Technologies from '@/components/home/Technologies';
import Experience from '@/components/home/Experience';
import Languages from '@/components/home/Languages';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Specialties />
      <Technologies />
      <Experience />
      <Languages />
      <FeaturedProjects />
      <Contact />
    </>
  );
}
