export const siteConfig = {
  name: "Rafa Soelistiono",
  alternateName: "rafasoelistiono",
  title: "Rafa Soelistiono (rafasoelistiono) | Software Engineer & Web Developer",
  description:
    "Portfolio of Rafa Soelistiono (rafasoelistiono), a software engineer and web developer from Universitas Indonesia working across full-stack web, backend systems, CI/CD, and robotics.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rafasoelistiono.tech",
  github: "https://github.com/rafasoelistiono",
  instagram: "https://www.instagram.com/rafasoelistiono/",
  linkedin: "https://www.linkedin.com/in/rafa-rally-soelistiono-2107861b8",
  profileImage: "/profile-rafa-soelistiono.jpg",
  googleVerification: "ed-vj6tEBkukyfgFR-KoHUMe0X8JQ2spdjLQ-ze04ZY",
  keywords: [
    "Rafa",
    "Rafa Soelistiono",
    "rafasoelistiono",
    "web dev",
    "web developer",
    "software engineer",
    "software engineering portfolio",
    "full-stack developer",
    "backend engineer",
    "Universitas Indonesia computer science"
  ]
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
