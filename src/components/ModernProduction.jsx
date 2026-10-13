import React from 'react'
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiMongodb,
  SiMysql,
  SiLangchain,
  SiMistralai,
  SiGooglegemini,
  SiDocker,
  SiVercel,
  SiRender,
  SiGit,
  SiGithub,
  SiCursor,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'
import aiOpenai from '../assets/icons/ai-openai.png'

const skillGroups = [
  {
    title: 'Languages',
    items: [
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'React.js', Icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', Icon: SiNextdotjs, color: '#FFFFFF' },
      { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Shadcn', Icon: SiShadcnui, color: '#FFFFFF' },
    ],
  },
  {
    title: 'Backend / Database',
    items: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', Icon: SiExpress, color: '#FFFFFF' },
      { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
      { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
    ],
  },
  {
    title: 'GenAI',
    items: [
      { name: 'RAG', initials: 'RAG', color: '#A78BFA' },
      { name: 'LangChain', Icon: SiLangchain, color: '#1C3C3C' },
      { name: 'OpenAI', src: aiOpenai, color: '#10A37F' },
      { name: 'Mistral', Icon: SiMistralai, color: '#F7D046' },
      { name: 'Gemini', Icon: SiGooglegemini, color: '#8E75B2' },
      { name: 'Pinecone', initials: 'PC', color: '#000000' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    items: [
      { name: 'AWS EC2', Icon: FaAws, color: '#FF9900' },
      { name: 'S3', Icon: FaAws, color: '#FF9900' },
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { name: 'Compose', Icon: SiDocker, color: '#2496ED' },
      { name: 'Vercel', Icon: SiVercel, color: '#FFFFFF' },
      { name: 'Render', Icon: SiRender, color: '#46E3B7' },
    ],
  },
  {
    title: 'Developer Tools',
    items: [
      { name: 'Git', Icon: SiGit, color: '#F05032' },
      { name: 'GitHub', Icon: SiGithub, color: '#FFFFFF' },
      { name: 'VS Code', Icon: VscVscode, color: '#007ACC' },
      { name: 'Compass', Icon: SiMongodb, color: '#47A248' },
      { name: 'Cursor', Icon: SiCursor, color: '#FFFFFF' },
    ],
  },
]

const LogoGlyph = ({ logo, className }) => {
  if (logo.Icon) {
    const { Icon } = logo
    return (
      <Icon
        className={`text-gray-500 transition-colors duration-300 group-hover:text-(--hover-color) ${className}`}
      />
    )
  }

  if (logo.src) {
    return (
      <img
        src={logo.src}
        alt={logo.name}
        className={`object-contain opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 ${className}`}
      />
    )
  }

  return (
    <span
      className={`flex items-center justify-center rounded-lg bg-white/10 text-[10px] font-semibold tracking-wide text-gray-400 transition-colors duration-300 group-hover:text-white sm:text-xs ${className}`}
    >
      {logo.initials || logo.name.slice(0, 2)}
    </span>
  )
}

const SkillTile = ({ logo }) => (
  <div
    style={{ '--hover-color': logo.color }}
    className="group flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 sm:h-24 sm:w-24"
  >
    <LogoGlyph logo={logo} className="h-7 w-7 sm:h-8 sm:w-8" />
    <span className="px-1 text-center text-[10px] leading-tight text-gray-500 sm:text-xs">
      {logo.name}
    </span>
  </div>
)

const SkillGroup = ({ title, items }) => (
  <div className="w-full">
    <p className="mb-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
      {title}
    </p>
    <div className="flex flex-wrap justify-start gap-3 sm:gap-4">
      {items.map((logo) => (
        <SkillTile key={logo.name} logo={logo} />
      ))}
    </div>
  </div>
)

const ModernProduction = () => {
  return (
    <section className="relative isolate overflow-hidden bg-black py-20 px-4 sm:py-28">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
          Built With
        </p>
        <h2 className="mt-4 font-body text-4xl font-semibold text-white sm:text-5xl">
          A Modern, Production-Toolchain Stack
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-logo text-sm text-gray-400 sm:text-base">
          Languages, frontend, backend, GenAI, and cloud — the full stack I use to ship real products.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-14 flex max-w-5xl flex-col gap-10 px-2 sm:mt-16 sm:gap-12 sm:px-6">
        {skillGroups.map((group) => (
          <SkillGroup key={group.title} title={group.title} items={group.items} />
        ))}
      </div>
    </section>
  )
}

export default ModernProduction
