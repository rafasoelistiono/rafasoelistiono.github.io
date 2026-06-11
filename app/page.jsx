import AnimatedReveal from "@/components/AnimatedReveal";
import ArrowIcon from "@/components/ArrowIcon";
import ContactStrip from "@/components/ContactStrip";
import HeroSection from "@/components/HeroSection";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import ExperienceItem from "@/components/ExperienceItem";
import { getFeaturedProjects } from "@/lib/projects";
import { getExperienceItems } from "@/lib/experience";
import { siteConfig } from "@/lib/site";

export default async function HomePage() {
  const projects = await getFeaturedProjects();
  const experiences = await getExperienceItems();

  return (
    <main>
      <HeroSection />
      <ContactStrip />

      <section className="section editorial-grid" aria-labelledby="intro-title">
        <AnimatedReveal className="intro-copy">
          <p className="eyebrow">Introduction</p>
          <h2 id="intro-title">Building, deploying, and improving systems that power user experience.</h2>
          <p>
            I am an analytical problem-solver and fast learner with delivery experience across
            software engineering internships, research in robotic reinforcement learning, product
            teams, and programming leadership. I am seeking a tech intern role where I can help
            build resilient systems from implementation to release readiness.
          </p>
          <a className="text-link" href="/experience">
            Read my experience <ArrowIcon className="link-arrow" />
          </a>
        </AnimatedReveal>

        <AnimatedReveal className="profile-plate" delay={120}>
          <img src={siteConfig.profileImage} alt="Portrait of Rafa Soelistiono" />
          <ArrowIcon className="profile-arrow" />
        </AnimatedReveal>
      </section>

      <section className="section">
        <SectionHeader
          label="My Project"
          title="Backend, full-stack, and robotics projects delivered through team workflows."
          actionHref="/projects"
          actionLabel="All projects"
        />
        <div className="project-list">
          {projects.slice(0, 4).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          label="My Experience"
          title="Engineering, research, and leadership experience across software and robotics."
          actionHref="/experience"
          actionLabel="Experience archive"
        />
        <div className="experience-list">
          {experiences.slice(0, 4).map((item, index) => (
            <ExperienceItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
