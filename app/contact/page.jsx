import ContactForm from "@/components/ContactForm";
import SectionHeader from "@/components/SectionHeader";
import { absoluteUrl } from "@/lib/site";

export const metadata = {
  title: "Contact Rafa Soelistiono",
  description:
    "Contact Rafa Soelistiono (rafasoelistiono) for web development, software engineering, backend, and full-stack collaboration inquiries.",
  alternates: {
    canonical: "/contact"
  },
  openGraph: {
    title: "Contact Rafa Soelistiono | Software Engineer and Web Developer",
    description:
      "Contact Rafa Soelistiono for web development, software engineering, backend, and full-stack collaboration inquiries.",
    url: absoluteUrl("/contact")
  }
};

export default function ContactPage() {
  return (
    <main className="page-shell contact-page">
      <SectionHeader label="Contact Me" title="Send a project idea, collaboration note, or feedback." />
      <ContactForm />
    </main>
  );
}
