import "@/app/globals.css";
import { absoluteUrl, siteConfig } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/"
  },
  verification: {
    google: siteConfig.googleVerification
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    locale: "en_US",
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.profileImage,
        width: 1200,
        height: 630,
        alt: "Rafa Soelistiono portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.profileImage]
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" }
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  const personId = `${siteConfig.url}/#person`;
  const websiteId = `${siteConfig.url}/#website`;
  const profilePageId = `${siteConfig.url}/#profile-page`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        alternateName: siteConfig.alternateName,
        url: siteConfig.url,
        image: absoluteUrl(siteConfig.profileImage),
        jobTitle: "Software Engineer and Web Developer",
        description: siteConfig.description,
        knowsAbout: [
          "Software Engineering",
          "Web Development",
          "Full-stack Web",
          "Backend Systems",
          "CI/CD",
          "Robotics"
        ],
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: "Universitas Indonesia"
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jakarta",
          addressCountry: "ID"
        },
        sameAs: [siteConfig.github, siteConfig.instagram, siteConfig.linkedin]
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: `${siteConfig.name} Portfolio`,
        alternateName: siteConfig.alternateName,
        url: siteConfig.url,
        inLanguage: "en",
        publisher: {
          "@id": personId
        }
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: {
          "@id": websiteId
        },
        mainEntity: {
          "@id": personId
        }
      }
    ]
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
