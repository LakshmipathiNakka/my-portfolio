import { Header, Hero, About, Skills, Projects, Experience, Education, Certifications, Contact, Footer, SectionDivider } from "@/components/portfolio";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <Skills />
        <SectionDivider />
        <Projects />
        <Experience />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
