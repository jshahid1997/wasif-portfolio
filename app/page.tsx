import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { fetchProjects, groupProjects } from "@/lib/sheets";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allProjects = await fetchProjects();
  const grouped = groupProjects(allProjects);

  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <About />
      <Experience />
      <Projects
        motionDesignProjects={grouped.motion}
        documentaryStyleProjects={grouped.documentary}
        shortFormProjects={grouped.short}
      />
      <Contact />
    </main>
  );
}
