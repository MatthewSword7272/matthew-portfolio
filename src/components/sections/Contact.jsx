import { FaGithub, FaLinkedin, FaEnvelope, FaFilePdf } from "react-icons/fa6";
import Section from "../Section";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const links = [
  { label: "Email", href: "mailto:mcatalfamo5@gmail.com", Icon: FaEnvelope },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/matthew-catalfamo-0a353a25a/",
    Icon: FaLinkedin,
  },
  { label: "GitHub", href: "https://github.com/MatthewSword7272", Icon: FaGithub },
  { label: "Resume", href: "/Matthew_Catalfamo_CV.pdf", Icon: FaFilePdf },
];

const Contact = () => {
  const scope = useScrollReveal(".contact-reveal");

  return (
    <Section id="contact" title="Let's build something">
      <div ref={scope}>
        <p className="contact-reveal text-cyan-100/90 max-w-xl leading-relaxed">
          I'm a Melbourne-based full-stack developer open to new projects and roles. If you've
          got something in mind, the fastest way to reach me is below.
        </p>
        <div className="contact-reveal flex flex-wrap gap-4 mt-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center gap-2 rounded-3xl border border-cyan-200 bg-cyan-950 text-cyan-200 px-5 py-2 hover:bg-white hover:text-black duration-300"
            >
              <link.Icon className="text-lg" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Contact;
