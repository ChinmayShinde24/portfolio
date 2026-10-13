// Wadii
import wadii480Webp from "../images/Work/wadii/wadii-480.webp";
import wadii768Webp from "../images/Work/wadii/wadii-768.webp";
import wadii1440Webp from "../images/Work/wadii/wadii-1440.webp";

import wadii480Avif from "../images/Work/wadii/wadii-480.avif";
import wadii768Avif from "../images/Work/wadii/wadii-768.avif";
import wadii1440Avif from "../images/Work/wadii/wadii-1440.avif";

// Resume Builder
import resume480Webp from "../images/Work/resumebuilder/resumebuilder-480.webp";
import resume768Webp from "../images/Work/resumebuilder/resumebuilder-768.webp";
import resume1440Webp from "../images/Work/resumebuilder/resumebuilder-1440.webp";

import resume480Avif from "../images/Work/resumebuilder/resumebuilder-480.avif";
import resume768Avif from "../images/Work/resumebuilder/resumebuilder-768.avif";
import resume1440Avif from "../images/Work/resumebuilder/resumebuilder-1440.avif";

// ContextAI
import contextai480Webp from "../images/Work/contextai/contextai-480.webp";
import contextai768Webp from "../images/Work/contextai/contextai-768.webp";
import contextai1440Webp from "../images/Work/contextai/contextai-1440.webp";

import contextai480Avif from "../images/Work/contextai/contextai-480.avif";
import contextai768Avif from "../images/Work/contextai/contextai-768.avif";
import contextai1440Avif from "../images/Work/contextai/contextai-1440.avif";

// ChitChat
import chitchat480Webp from "../images/Work/chitchat/chitchat-480.webp";
import chitchat768Webp from "../images/Work/chitchat/chitchat-768.webp";
import chitchat1440Webp from "../images/Work/chitchat/chitchat-1440.webp";

import chitchat480Avif from "../images/Work/chitchat/chitchat-480.avif";
import chitchat768Avif from "../images/Work/chitchat/chitchat-768.avif";
import chitchat1440Avif from "../images/Work/chitchat/chitchat-1440.avif";

const projects = [
  {
    id: 1,
    title: "Wadii",
    category: "SaaS Platform",
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "EC2",
      "Vercel",
      "Docker",
      "CI/CD",
    ],
    image: {
      webp: {
        480: wadii480Webp,
        768: wadii768Webp,
        1440: wadii1440Webp,
      },
      avif: {
        480: wadii480Avif,
        768: wadii768Avif,
        1440: wadii1440Avif,
      },
    },
    description:
      "SaaS venue and booking platform for managing leads, bookings, and venue operations.",
    highlights: [
      "Built a full-stack venue & booking SaaS with React, TypeScript, Node.js, Express, and MongoDB.",
      "Finance reports with cash ledger, income & expenditure, and event-wise P&L plus CSV export.",
      "CI/CD pipelines with Docker, EC2, and Vercel for reliable deployments.",
    ],
    link: "https://app.wadii.in/login",
  },
  {
    id: 2,
    title: "Resume Builder",
    category: "AI Product",
    tech: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "Gemini AI"],
    image: {
      webp: {
        480: resume480Webp,
        768: resume768Webp,
        1440: resume1440Webp,
      },
      avif: {
        480: resume480Avif,
        768: resume768Avif,
        1440: resume1440Avif,
      },
    },
    description:
      "Full-stack AI resume builder with live A4 preview, PDF export, and ATS scoring.",
    highlights: [
      "Next.js + TypeScript app with JWT auth, multi-step editing, live A4 preview, and PDF export.",
      "Gemini AI for role-aware content generation, rewriting, summaries, and ATS scoring.",
      "Secure REST APIs with user-scoped access and ATS-friendly PDF via jsPDF & html2canvas.",
    ],
    link: "https://resume-builder-acxx.onrender.com/auth/login",
  },
  {
    id: 3,
    title: "ContextAI",
    category: "AI / RAG",
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "FastAPI",
      "MistralAI",
      "Gemini",
      "Pinecone",
      "RAG",
    ],
    image: {
      webp: {
        480: contextai480Webp,
        768: contextai768Webp,
        1440: contextai1440Webp,
      },
      avif: {
        480: contextai480Avif,
        768: contextai768Avif,
        1440: contextai1440Avif,
      },
    },
    description:
      "RAG-based PDF Q&A system for document-grounded question answering.",
    highlights: [
      "RAG PDF Q&A with React, Node.js, Express, FastAPI, and MongoDB.",
      "PDF extraction, chunking, Mistral embeddings, and Pinecone semantic search.",
      "Mistral LLM with Gemini fallback in a 3-tier frontend / backend / AI architecture.",
    ],
    link: "https://contextai-frontend.onrender.com/",
  },
  {
    id: 4,
    title: "ChitChat",
    category: "Real-time Chat",
    tech: ["React", "Node.js", "MongoDB", "Express", "Socket.IO"],
    image: {
      webp: {
        480: chitchat480Webp,
        768: chitchat768Webp,
        1440: chitchat1440Webp,
      },
      avif: {
        480: chitchat480Avif,
        768: chitchat768Avif,
        1440: chitchat1440Avif,
      },
    },
    description:
      "Real-time chat app powered by Socket.IO for instant messaging.",
    highlights: [
      "Built with React, Node.js, Express, and MongoDB for a full chat experience.",
      "Socket.IO for real-time one-to-one and group messaging with live delivery.",
      "Online presence, typing indicators, and persistent chat history.",
    ],
    link: "https://chat-app-frontend-3lw2.onrender.com",
  },
];

export default projects;
