import type { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-1",
    title: "FairSelect - Smart Interview Application",
    slug: "fairselect",
    category: "AI/ML",
    description: "An AI-powered smart interview evaluation system utilizing deep learning and NLP techniques. Built with a Python backend and packaged as a desktop app.",
    technologies: ["Python", "Deep Learning", "NLP", "Electron.js", "HTML/CSS", "JavaScript"],
    status: "Completed",
    featured: true
  },
  {
    id: "proj-2",
    title: "Leather Defect Classification",
    slug: "leather-defect",
    category: "Computer Vision",
    description: "Deep learning classification system for automated quality control and defect detection using real-time leather industrial datasets.",
    technologies: ["Python", "Deep Learning", "Computer Vision", "Neural Networks"],
    status: "Completed",
    featured: true
  },
  {
    id: "proj-3",
    title: "Asthma Severity Prediction System",
    slug: "asthma-prediction",
    category: "AI/ML",
    description: "Machine learning classification system predicting asthma severity levels using medical datasets (PEFR, eosinophil, FEV1%).",
    technologies: ["Python", "Pandas", "Scikit-learn", "Machine Learning"],
    status: "Completed",
    featured: true
  },
  {
    id: "proj-4",
    title: "Hexatech Gadgets Store",
    slug: "hexatech",
    category: "Mobile",
    description: "An e-commerce Android mobile application developed for browsing, buying, and selling electronic gadgets seamlessly.",
    technologies: ["Java", "Android Studio", "Mobile UI", "OOP"],
    status: "Completed",
    featured: false
  },
  {
    id: "proj-5",
    title: "React E-Commerce Platform",
    slug: "react-ecommerce",
    category: "Web",
    description: "A modern, responsive e-commerce web application featuring dynamic state management and a seamless user shopping experience.",
    technologies: ["React.js", "JavaScript", "Web Development", "State Management"],
    status: "Completed",
    featured: false
  },
  {
    id: "proj-6",
    title: "Camera Filters Application",
    slug: "camera-filters",
    category: "Computer Vision",
    description: "An image processing application developed to apply mathematical filters and visual effects to camera feeds.",
    technologies: ["MATLAB", "Image Processing", "Mathematics"],
    status: "Completed",
    featured: false
  },
  {
    id: "proj-7",
    title: "Hospital Management System (GUI)",
    slug: "hospital-management-csharp",
    category: "Desktop",
    description: "A comprehensive GUI-based desktop application for managing patient records, appointments, and hospital administration.",
    technologies: ["C#", "Visual Studio", ".NET", "Desktop UI"],
    status: "Completed",
    featured: false
  },
  {
    id: "proj-8",
    title: "Hospital Management System (Core)",
    slug: "hospital-management-cpp",
    category: "Desktop",
    description: "A core backend management system built to demonstrate efficient memory management and complex data structure implementation.",
    technologies: ["C++", "Data Structures (DSA)", "Algorithms"],
    status: "Completed",
    featured: false
  },
  {
    id: "proj-9",
    title: "Car Rentals Management System",
    slug: "car-rentals",
    category: "Desktop",
    description: "An application handling vehicle inventory and rental logs, built to master Object-Oriented Programming (OOP) and programming fundamentals.",
    technologies: ["C++", "OOP", "Programming Fundamentals"],
    status: "Completed",
    featured: false
  },
  {
    id: "proj-10",
    title: "ITC Computers Web Platform",
    slug: "itc-computers",
    category: "Web",
    description: "Responsive web application highlighting products, services, and training academy courses for a local tech business.",
    technologies: ["HTML", "CSS", "JavaScript", "Web Design"],
    status: "Completed",
    featured: false
  }
];