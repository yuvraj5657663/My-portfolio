import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';
import { Project } from './src/models/Projects.js';

// Force DNS to use Google's Public DNS to bypass local block
dns.setServers(['8.8.8.8', '8.8.4.4']);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedProjects = [
  {
    title: 'Modern E-commerce Platform',
    description: 'A full-featured e-commerce platform built with React, Node.js, and MongoDB. Features include real-time inventory management, secure payment integration, and a premium administrative dashboard.',
    techStack: ['React', 'Node.js', 'MongoDB', 'TailwindCSS', 'Zustand'],
    liveLink: 'https://ecommerce-demo.example.com',
    githubLink: 'https://github.com/example/ecommerce',
    featured: true
  },
  {
    title: 'AI Portfolio Assistant',
    description: 'An intelligent assistant integrated into a portfolio website, using Google Gemini API to answer questions about projects, experience, and skills in real-time.',
    techStack: ['TypeScript', 'Express', 'Google Generative AI', 'Vite'],
    liveLink: 'https://ai-assistant.example.com',
    githubLink: 'https://github.com/example/ai-assistant',
    featured: true
  },
  {
    title: 'Real-time Analytics Dashboard',
    description: 'A high-performance dashboard for monitoring website traffic and user engagement. Includes dynamic charts, geographic heatmaps, and customizable alerts.',
    techStack: ['Next.js', 'D3.js', 'PostgreSQL', 'Redis'],
    liveLink: 'https://analytics-dashboard.example.com',
    githubLink: 'https://github.com/example/analytics',
    featured: true
  }
];

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('Connected to MongoDB');

    await Project.deleteMany({ featured: true });
    console.log('Cleared existing featured projects');

    await Project.insertMany(seedProjects);
    console.log('Seeded projects successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
};

runSeed();
