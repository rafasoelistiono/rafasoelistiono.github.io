export const siteConfig = {
  name: "Rafa Soelistiono",
  title: "Rafa Soelistiono - Software Engineering Portfolio",
  description:
    "Software engineering portfolio of Rafa Soelistiono, a Universitas Indonesia computer science student working across full-stack web, backend systems, CI/CD, and robotics.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rafasoelistiono.github.io",
  github: "https://github.com/rafasoelistiono",
  instagram: "https://www.instagram.com/rafasoelistiono/",
  linkedin: "https://www.linkedin.com/in/rafa-rally-soelistiono-2107861b8",
  profileImage: "/profile-rafa-soelistiono.jpg",
  googleVerification: "ed-vj6tEBkukyfgFR-KoHUMe0X8JQ2spdjLQ-ze04ZY"
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
