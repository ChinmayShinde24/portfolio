// Practice.jsx
import { motion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import khanakhazanaImg from "../assets/Originals/Practice/khanakhazana.png";
import planitImg from "../assets/Originals/Practice/planit.png";
import parallaxImg from "../assets/Originals/Practice/parallax.png";
import searchimageImg from "../assets/Originals/Practice/searchimage.png";
import safarImg from "../assets/Originals/Practice/safar.png";
import aniketpharmaImg from "../assets/Originals/Practice/aniketpharma.png";

import khanakhazana480Avif from "../assets/images/Practice/khanakhazana/khanakhazana-480.avif";
import khanakhazana480Webp from "../assets/images/Practice/khanakhazana/khanakhazana-480.webp";
import khanakhazana768Avif from "../assets/images/Practice/khanakhazana/khanakhazana-768.avif";
import khanakhazana768Webp from "../assets/images/Practice/khanakhazana/khanakhazana-768.webp";

import planit480Avif from "../assets/images/Practice/planit/planit-480.avif";
import planit480Webp from "../assets/images/Practice/planit/planit-480.webp";
import planit768Avif from "../assets/images/Practice/planit/planit-768.avif";
import planit768Webp from "../assets/images/Practice/planit/planit-768.webp";

import parallax480Avif from "../assets/images/Practice/parallax/parallax-480.avif";
import parallax480Webp from "../assets/images/Practice/parallax/parallax-480.webp";
import parallax768Avif from "../assets/images/Practice/parallax/parallax-768.avif";
import parallax768Webp from "../assets/images/Practice/parallax/parallax-768.webp";

import searchimage480Avif from "../assets/images/Practice/searchimage/searchimage-480.avif";
import searchimage480Webp from "../assets/images/Practice/searchimage/searchimage-480.webp";
import searchimage768Avif from "../assets/images/Practice/searchimage/searchimage-768.avif";
import searchimage768Webp from "../assets/images/Practice/searchimage/searchimage-768.webp";

import safar480Avif from "../assets/images/Practice/safar/safar-480.avif";
import safar480Webp from "../assets/images/Practice/safar/safar-480.webp";
import safar768Avif from "../assets/images/Practice/safar/safar-768.avif";
import safar768Webp from "../assets/images/Practice/safar/safar-768.webp";

import aniketpharma480Avif from "../assets/images/Practice/aniketpharma/aniketpharma-480.avif";
import aniketpharma480Webp from "../assets/images/Practice/aniketpharma/aniketpharma-480.webp";
import aniketpharma768Avif from "../assets/images/Practice/aniketpharma/aniketpharma-768.avif";
import aniketpharma768Webp from "../assets/images/Practice/aniketpharma/aniketpharma-768.webp";

const PRACTICE_PROJECTS = [
  {
    id: "khanakhazana",
    title: "Khana-Khazana",
    image: {
      fallback: khanakhazanaImg,
      avif: { 480: khanakhazana480Avif, 768: khanakhazana768Avif },
      webp: { 480: khanakhazana480Webp, 768: khanakhazana768Webp },
    },
    link: "https://khana-khazanaaa.netlify.app/",
  },
  {
    id: "planit",
    title: "Plan-IT",
    image: {
      fallback: planitImg,
      avif: { 480: planit480Avif, 768: planit768Avif },
      webp: { 480: planit480Webp, 768: planit768Webp },
    },
    link: "https://taskmanager6.netlify.app/",
  },
  {
    id: "parallax",
    title: "Parallax Website",
    image: {
      fallback: parallaxImg,
      avif: { 480: parallax480Avif, 768: parallax768Avif },
      webp: { 480: parallax480Webp, 768: parallax768Webp },
    },
    link: "https://rococo-chebakia-45e71d.netlify.app/",
  },
  {
    id: "searchimage",
    title: "Search Image",
    image: {
      fallback: searchimageImg,
      avif: { 480: searchimage480Avif, 768: searchimage768Avif },
      webp: { 480: searchimage480Webp, 768: searchimage768Webp },
    },
    link: "https://relaxed-fudge-0f1588.netlify.app/",
  },
  {
    id: "safar",
    title: "Safar",
    image: {
      fallback: safarImg,
      avif: { 480: safar480Avif, 768: safar768Avif },
      webp: { 480: safar480Webp, 768: safar768Webp },
    },
    link: "https://safar-cabs.netlify.app/",
  },
  {
    id: "aniketpharma",
    title: "AniketPharma",
    image: {
      fallback: aniketpharmaImg,
      avif: { 480: aniketpharma480Avif, 768: aniketpharma768Avif },
      webp: { 480: aniketpharma480Webp, 768: aniketpharma768Webp },
    },
    link: "https://aniket-pharmaceuticals.netlify.app/",
  },
];

const Practice = () => {
  const total = PRACTICE_PROJECTS.length;
  const centerIndex = (total - 1) / 2;
  const anglePerCard = 5; // degrees rotated per step away from center
  const dropStrength = 5;  // px — multiplied by offset^2 for a curved (not straight) arc

  const renderProjectImage = (image, title) => {
    const hasAvif = image?.avif && Object.keys(image.avif).length > 0;
    const hasWebp = image?.webp && Object.keys(image.webp).length > 0;

    if (!hasAvif && !hasWebp) {
      return <img src={image.fallback} alt={title} className="h-full w-full object-cover" />;
    }

    const avifSrcSet = hasAvif
      ? Object.entries(image.avif).map(([width, src]) => `${src} ${width}w`).join(", ")
      : null;
    const webpSrcSet = hasWebp
      ? Object.entries(image.webp).map(([width, src]) => `${src} ${width}w`).join(", ")
      : null;

    return (
      <picture className="h-full w-full block">
        {hasAvif && (
          <source type="image/avif" srcSet={avifSrcSet} sizes="(max-width: 768px) 80vw, 11rem" />
        )}
        {hasWebp && (
          <source type="image/webp" srcSet={webpSrcSet} sizes="(max-width: 768px) 80vw, 11rem" />
        )}
        <img src={image.fallback} alt={title} className="h-full w-full object-cover" />
      </picture>
    );
  };

  return (
    <section id="demo" className="relative w-full bg-gray-300 px-4 py-24">
      {/* Heading */}
      <div className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-gray-700 md:text-sm">
          PRACTICE
        </p>
        <AnimatedHeading
          as="h2"
          className="mb-4 text-3xl font-semibold text-gray-900 md:text-5xl"
          lines={["Projects I Built to Learn by", "Doing"]}
        />
        <p className="text-sm text-gray-700 md:text-base">
          Small, self-directed builds, each one a concept I turned into
          something real before it ever became client work.
        </p>
      </div>

      {/* Fanned card row — no local overflow clip, so hover pop-out isn't boxed in.
          Horizontal scrollbar suppression is handled globally (html, body { overflow-x: hidden })
          instead of here, since a local clip on this row would also clip the hover rise. */}
      <div className="flex items-end justify-center px-2">
        {PRACTICE_PROJECTS.map((project, i) => {
          const offset = i - centerIndex;
          const rotation = offset * anglePerCard;
          const drop = Math.pow(offset, 2) * dropStrength; // quadratic = smooth bowl curve, not a straight tilt

          return (
            <div
              key={project.id}
              style={{
                transform: `rotate(${rotation}deg) translateY(${drop}px)`,
                transformOrigin: "bottom center",
                zIndex: total - Math.abs(offset),
              }}
             className={`relative w-[clamp(4.75rem,16vw,11rem)] aspect-5/7 shrink-0
  ${i === 0 ? "" : "-ml-[clamp(2.375rem,8vw,5.5rem)]"}`}
            >
              <motion.a
  href={project.link}
  target="_blank"
  rel="noreferrer"
  whileHover={{
    scale: 1.12,
    rotate: -rotation,
    y: -drop - 24,
    zIndex: 50,
  }}
  whileTap={{
    scale: 1.12,
    rotate: -rotation,
    y: -drop - 24,
    zIndex: 50,
  }}
  transition={{ type: "spring", stiffness: 260, damping: 20 }}
  className="group relative block h-full w-full overflow-hidden rounded-2xl border border-gray-200 shadow-lg"
>
                {renderProjectImage(project.image, project.title)}

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                  <i className="ri-external-link-line text-2xl text-white"></i>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent px-3 py-2">
                  <p className="truncate text-xs font-medium text-white sm:text-sm">{project.title}</p>
                </div>
              </motion.a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Practice;
