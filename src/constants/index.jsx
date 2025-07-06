import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaDiscord,
  FaInstagram,
} from "react-icons/fa";

import { SiAdobelightroom } from "react-icons/si";  // Lightroom
import { TbBrandSnapseed } from "react-icons/tb";   // Snapseed
import { TbBrandPicsart } from "react-icons/tb"; // Picsart
import { FaMagic } from "react-icons/fa";      // LD (Lens Distortion)
import { FaCameraRetro } from "react-icons/fa";    // THETA+
import { DiPhotoshop } from "react-icons/di";     // Photoshop (using Adobe icon for representation)

import image1 from "../assets/gallery1.jpg";
import image2 from "../assets/gallery2.jpg";
import image3 from "../assets/gallery3.jpg";
import image4 from "../assets/gallery4.jpg";
import image5 from "../assets/gallery5.jpg";
import image6 from "../assets/gallery6.jpg";
import image7 from "../assets/gallery7.jpg";
import image8 from "../assets/gallery8.jpg";

export const NAVIGATION_LINKS = [
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const PROFILE = {
  name: "Pasindu Chandrasiri",
  info: "Full-stack developer with a flair for mobile photography.",
};

export const ABOUT = {
  text1:
    "Capturing moments through the lens with creativity and precision.",
  text2:
    "Hello! I'm Pasindu Chandrasiri, a full-stack developer with a passion for mobile photography. I specialize in blending technology and art to create stunning visual stories through my photography. My unique perspective and attention to detail allow me to capture moments that resonate deeply with viewers. From scenic landscapes to candid urban shots, I aim to deliver photos that are both captivating and authentic. Whether developing web experiences or snapping the perfect shot, I am driven by creativity and a commitment to excellence in every frame.",
};

export const GALLERY = [
  {
    title: "Landscape Photography",
    subtitle:
      "Capturing the beauty of nature, including mountains, forests, and oceans.",
    image: image1,
    slug: "landscape"
  },
  {
    title: "Portrait Photography",
    subtitle:
      "Focusing on individuals or groups, highlighting emotions and expressions.",
    image: image2,
    slug: "portrait"
  },
  {
    title: "Macro Photography",
    subtitle: "Showcasing the intricate details of small subjects like insects and flowers.",
    image: image3,
    slug: "macro"
  },
  {
    title: "Travel Photography",
    subtitle:
      "Capturing diverse cultures, landscapes, and experiences from different locations.",
    image: image4,
    slug: "travel"
  },
  {
    title: "Night Photography",
    subtitle:
      "Exploring the world at night, using light and long exposures to capture dark scenes.",
    image: image5,
    slug: "night"
  },
  {
    title: "Black and White Photography",
    subtitle:
      "Highlighting contrast and form by removing color for a timeless look.",
    image: image6,
    slug: "black-and-white"
  },
  {
    title: "Wildlife Photography",
    subtitle: "Photographing animals in their natural habitats, capturing their behaviors.",
    image: image7,
    slug: "wildlife"
  },
  {
    title: "Street Photography",
    subtitle: "Documenting candid moments in urban environments and public spaces.",
    image: image8,
    slug: "street"
  },
];

export const SKILLS = [
  {
    icon: <DiPhotoshop className="text-4xl lg:text-6xl text-blue-500" />,
    name: "Photoshop",
    experience: "0.5+ years",
  },
  {
    icon: <SiAdobelightroom className="text-4xl lg:text-6xl text-blue-600" />,
    name: "Lightroom",
    experience: "1+ years",
  },
  {
    icon: <TbBrandSnapseed className="text-4xl lg:text-6xl text-green-500" />,
    name: "Snapseed",
    experience: "1+ year",
  },
  {
    icon: <TbBrandPicsart className="text-4xl lg:text-6xl text-pink-500" />,
    name: "Picsart",
    experience: "2+ years",
  },
  {
    icon: <FaMagic className="text-4xl lg:text-6xl text-purple-600" />,
    name: "LD (Lens Distortion)",
    experience: "1+ year",
  },
  {
    icon: <FaCameraRetro className="text-4xl lg:text-6xl text-white-600" />,
    name: "THETA+",
    experience: "1+ year",
  },
];

export const SOCIAL_MEDIA_LINKS = [
  {
    href: "https://www.facebook.com/pasindu.chandrasiri.493?mibextid=ZbWKwL",
    icon: <FaFacebook fontSize={25} className="hover:opacity-80" />,
  },
  {
    href: "https://discord.com/",
    icon: <FaDiscord fontSize={25} className="hover:opacity-80" />,
  },
  {
    href: "https://www.instagram.com/pasindu_chandrasiri?igsh=MWZ0ZzFremJrNTkzag==",
    icon: <FaInstagram fontSize={25} className="hover:opacity-80" />,
  },
  {
    href: "https://x.com/Pasindu_493",
    icon: <FaTwitter fontSize={25} className="hover:opacity-80" />,
  },
  {
    href: "https://github.com/PasinduChandrasiri",
    icon: <FaGithub fontSize={25} className="hover:opacity-80" />,
  },
  {
    href: "www.linkedin.com/in/pasinduchandrasiri",
    icon: <FaLinkedin fontSize={25} className="hover:opacity-80" />,
  },
];