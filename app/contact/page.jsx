import ContactForm from "@/components/ContactForm";
import SectionHeader from "@/components/SectionHeader";
import { absoluteUrl } from "@/lib/site";

export const metadata = {
  title: "Contact Me",
  description: "Contact Rafa Soelistiono for web project collaborations and portfolio inquiries.",
  alternates: {
    canonical: "/contact"
  },
  openGraph: {
    title: "Contact Me | Rafa Soelistiono",
    description: "Contact Rafa Soelistiono for web project collaborations.",
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
