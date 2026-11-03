import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Certifications } from "@/components/sections/certifications";
import { ExperienceSection } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { certifications, experiences, hasContact } from "@/data/portfolio";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        {certifications.length > 0 ? <Certifications /> : null}
        {experiences.length > 0 ? <ExperienceSection /> : null}
        {hasContact ? <Contact /> : null}
      </main>
      <Footer />
    </>
  );
}
