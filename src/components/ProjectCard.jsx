import React from "react";

const ProjectCard = ({ project, index, total, cardRef }) => {
  const { webp, avif } = project.image;

  const largestWidth = Math.max(...Object.keys(webp).map(Number));

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="group relative w-[90%] shrink-0 overflow-hidden rounded-3xl bg-zinc-900 aspect-[2.1/1] sm:w-[60%] md:w-[45%] lg:w-[45%]"
    >
      {/* Blurred background */}
      <picture>
        <source
          type="image/avif"
          srcSet={Object.entries(avif)
            .map(([width, src]) => `${src} ${width}w`)
            .join(", ")}
          sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 45vw"
        />

        <source
          type="image/webp"
          srcSet={Object.entries(webp)
            .map(([width, src]) => `${src} ${width}w`)
            .join(", ")}
          sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 45vw"
        />

        <img
          src={webp[largestWidth]}
          alt=""
          aria-hidden="true"
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full scale-110 object-cover object-center blur-2xl opacity-70"
        />
      </picture>

      {/* Main image */}
      <picture>
        <source
          type="image/avif"
          srcSet={Object.entries(avif)
            .map(([width, src]) => `${src} ${width}w`)
            .join(", ")}
          sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 45vw"
        />

        <source
          type="image/webp"
          srcSet={Object.entries(webp)
            .map(([width, src]) => `${src} ${width}w`)
            .join(", ")}
          sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 45vw"
        />

        <img
          src={webp[largestWidth]}
          alt={project.title}
          loading="lazy"
          draggable={false}
          className="relative h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
        />
      </picture>

      <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/75" />

      <span className="absolute right-4 top-4 z-10 rounded-full bg-white/15 px-3 py-2 text-xs backdrop-blur-md">
        {String(index + 1).padStart(2, "0")} /{" "}
        {String(total).padStart(2, "0")}
      </span>

      {/* Default state: title + short tech chips */}
      <div className="absolute bottom-0 left-0 right-14 z-10 p-4 transition-opacity duration-300 sm:p-6 md:p-8 lg:p-10 sm:group-hover:opacity-0 sm:group-hover:pointer-events-none">
        <h3 className="font-body font-semibold sm:text-sm lg:text-2xl">
          {project.title}
        </h3>
        {project.tech?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((item) => (
              <span
                key={item}
                className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium backdrop-blur-md lg:text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover: full project details (desktop / hover devices) */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden flex-col justify-end p-4 opacity-0 transition-all duration-500 sm:flex sm:translate-y-3 sm:p-6 md:p-8 lg:p-10 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
        <h3 className="font-body text-lg font-semibold lg:text-2xl">
          {project.title}
        </h3>

        {project.tech?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium backdrop-blur-md lg:text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {project.highlights?.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-xs text-white/85 lg:text-sm">
            {project.highlights.map((point) => (
              <li key={point} className="flex gap-2 leading-snug">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/70" />
                <span className="line-clamp-2">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <span className="absolute bottom-6 right-6 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
        <i className="ri-arrow-right-up-line"></i>
      </span>
    </a>
  );
};

export default ProjectCard;
