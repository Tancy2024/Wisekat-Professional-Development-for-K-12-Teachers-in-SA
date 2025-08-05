import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
}

const Footer = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "/logo.png",
    alt: "logo",
    title: "WiseKat",
  },
}: FooterProps) => {
  return (
    <section className="flex justify-center w-full px-4 py-8 md:py-12 bg-white">
      <div className="container">
        <footer>
          <div className="flex flex-col items-center justify-between gap-10 text-center md:items-start lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 md:items-start">
              {/* Logo */}
              <div className="flex items-center gap-2">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    width={32}
                    height={32}
                    className="h-8"
                  />
                <h2 className="text-xl font-semibold text-gray-900">{logo.title}</h2>
              </div>
              <p className="text-sm text-gray-600">
              Empowering K–12 Teachers with AI
              </p>
              <ul className="flex items-center space-x-6 text-gray-600">
                <li className="font-medium hover:text-teal-800">
                  <a href="#" title="Instagram">
                    <FaInstagram className="size-5 sm:size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-teal-800">
                  <a href="#" title="Facebook">
                    <FaFacebook className="size-5 sm:size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-teal-800">
                  <a href="#" title="Twitter">
                    <FaTwitter className="size-5 sm:size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-teal-800">
                  <a href="#" title="LinkedIn">
                    <FaLinkedin className="size-5 sm:size-6" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:gap-10 lg:gap-20">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="mb-6 sm:mb-0">
                  <h3 className="mb-4 sm:mb-6 font-bold text-gray-900">{section.title}</h3>
                  <ul className="space-y-3 sm:space-y-4 text-sm text-gray-600">
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className="font-medium hover:text-teal-800"
                      >
                        <a href={link.href}>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 md:mt-16 lg:mt-20 flex flex-col justify-between gap-4 border-t border-gray-200 pt-6 md:pt-8 text-center text-sm font-medium text-gray-600 md:flex-row md:items-center md:text-left">
            <p>© 2025 WiseKat.com. All rights reserved.</p>
            <ul className="flex flex-wrap justify-center gap-4 md:justify-start">
              <li className="hover:text-teal-800">
                <a href="#"> Terms and Conditions</a>
              </li>
              <li className="hover:text-teal-800">
                <a href="#"> Privacy Policy</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };