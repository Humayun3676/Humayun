import type { Certification } from '../types';

export const CERTIFICATIONS_DATA: Certification[] = [
  // --- AI & Machine Learning ---
  {
    id: "cert-1",
    title: "Introduction to Artificial Intelligence (AI)",
    issuer: "IBM",
    category: "AI / ML",
    featured: true,
    fileName: "Introduction to Artificial Intelligence (AI).PNG",
    imagePath: "/certificates/Introduction to Artificial Intelligence (AI).PNG",
    logo: "/logos/ibm.svg"
  },
  {
    id: "cert-2",
    title: "Generative AI for Everyone",
    issuer: "DeepLearning.AI",
    category: "AI / ML",
    featured: true,
    fileName: "Generative AI for Everyone.PNG",
    imagePath: "/certificates/Generative AI for Everyone.PNG",
    logo: "/logos/deeplearning.png"
  },
  {
    id: "cert-3",
    title: "AI For Beginners",
    issuer: "HP",
    category: "AI / ML",
    featured: true,
    fileName: "AI For Beginners.PNG",
    imagePath: "/certificates/AI For Beginners.PNG",
    logo: "/logos/hp.png"
  },
  {
    id: "cert-4",
    title: "Introduction to NLP / AI",
    issuer: "Coursera",
    category: "AI / ML",
    featured: false,
    fileName: "Introduction to NLP  AI.PNG",
    imagePath: "/certificates/Introduction to NLP  AI.PNG",
    logo: "/logos/coursera.svg"
  },
  {
    id: "cert-5",
    title: "ChatGPT Playground / Beginners",
    issuer: "Coursera",
    category: "AI / ML",
    featured: false,
    fileName: "ChatGPT Playground Beginners.PNG",
    imagePath: "/certificates/ChatGPT Playground Beginners.PNG",
    logo: "/logos/coursera.svg"
  },

  // --- Software Engineering & Programming ---
  {
    id: "cert-6",
    title: "Software Design Methods and Tools",
    issuer: "University of Colorado",
    category: "Software Engineering",
    featured: false,
    fileName: "Software Design Methods and Tools.PNG",
    imagePath: "/certificates/Software Design Methods and Tools.PNG",
    logo: "/logos/ucolorado.png"
  },
  {
    id: "cert-7",
    title: "Problem Solving Using Computational Thinking",
    issuer: "University of Michigan",
    category: "Software Engineering",
    featured: false,
    fileName: "Problem Solving Using Computational Thinking.PNG",
    imagePath: "/certificates/Problem Solving Using Computational Thinking.PNG",
    logo: "/logos/michigan.png"
  },
  {
    id: "cert-8",
    title: "Java Certification",
    issuer: "University of Pennsylvania",
    category: "Programming",
    featured: false,
    fileName: "Java Certification.PNG",
    imagePath: "/certificates/Java Certification.PNG",
    logo: "/logos/upennsylvynia.png"
  },
  {
    id: "cert-9",
    title: "Introduction to Java",
    issuer: "LearnQuest",
    category: "Programming",
    featured: false,
    fileName: "Introduction to Java.PNG",
    imagePath: "/certificates/Introduction to Java.PNG",
    logo: "/logos/learnquest.png"
  },
  {
    id: "cert-10",
    title: "Java for Beginners: Getting Started",
    issuer: "Coursera",
    category: "Programming",
    featured: false,
    fileName: "Java for Beginners Getting Started.PNG",
    imagePath: "/certificates/Java for Beginners Getting Started.PNG",
    logo: "/logos/coursera.svg"
  },
  {
    id: "cert-11",
    title: "Introduction to C#",
    issuer: "SoloLearn",
    category: "Programming",
    featured: false,
    fileName: "Introduction to Csharp.PNG",
    imagePath: "/certificates/Introduction to Csharp.PNG",
    logo: "/logos/sololearn.png"
  },
  {
    id: "cert-12",
    title: "C++",
    issuer: "SoloLearn",
    category: "Programming",
    featured: false,
    fileName: "C++.PNG",
    imagePath: "/certificates/C++.PNG",
    logo: "/logos/sololearn.png"
  },

  // --- Automation & Testing ---
  {
    id: "cert-13",
    title: "Automation Scripting Using Selenium",
    issuer: "Coursera",
    category: "Testing & Automation",
    featured: false,
    fileName: "Automation Scripting Using Selenium.PNG",
    imagePath: "/certificates/Automation Scripting Using Selenium.PNG",
    logo: "/logos/coursera.svg"
  },
  {
    id: "cert-14",
    title: "Cypress UI Automation Testing for Absolute Beginners",
    issuer: "Coursera",
    category: "Testing & Automation",
    featured: false,
    fileName: "Cypress UI Automation Testing for Absolute Beginners.PNG",
    imagePath: "/certificates/Cypress UI Automation Testing for Absolute Beginners.PNG",
    logo: "/logos/coursera.svg"
  },
  {
    id: "cert-15",
    title: "Wireshark for Beginners",
    issuer: "Coursera",
    category: "Testing & Automation",
    featured: false,
    fileName: "Wireshark for Beginners.PNG",
    imagePath: "/certificates/Wireshark for Beginners.PNG",
    logo: "/logos/coursera.svg"
  },

  // --- Freelancing & Digital Skills ---
  {
    id: "cert-16",
    title: "Freelancing",
    issuer: "DigiSkills Training Program",
    category: "Freelancing",
    featured: false,
    fileName: "Freelancing.PNG",
    imagePath: "/certificates/Freelancing.PNG",
    logo: "/logos/digiskills.png"
  },
  {
    id: "cert-17",
    title: "Getting Started With Fiverr for Freelancers",
    issuer: "Coursera",
    category: "Freelancing",
    featured: false,
    fileName: "Getting Started With Fiverr for Freelancers.PNG",
    imagePath: "/certificates/Getting Started With Fiverr for Freelancers.PNG",
    logo: "/logos/coursera.svg"
  },
  {
    id: "cert-18",
    title: "Introduction to Digital Marketing",
    issuer: "University of California",
    category: "Digital Marketing",
    featured: false,
    fileName: "Introduction to Digital Marketing.PNG",
    imagePath: "/certificates/Introduction to Digital Marketing.PNG",
    logo: "/logos/uci.png"
  },

  // --- Creative ---
  {
    id: "cert-19",
    title: "Video Editing, Animation and Vlogging",
    issuer: "DigiSkills Training Program",
    category: "Creative",
    featured: false,
    fileName: "Video Editing, Animation and Vlogging.PNG",
    imagePath: "/certificates/Video Editing, Animation and Vlogging.PNG",
    logo: "/logos/digiskills.png"
  },
  {
    id: "cert-20",
    title: "Video Editing and Graphic Designing",
    issuer: "NAVTTC, Government of Pakistan",
    category: "Creative",
    featured: false,
    fileName: "Video Editing and Graphic Designing.PNG",
    imagePath: "/certificates/Video Editing and Graphic Designing.PNG",
    logo: "/logos/navttc.png"
  },

  // --- Professional Development ---
  {
    id: "cert-21",
    title: "Personality Development Certification",
    issuer: "Global Media Network UK",
    category: "Professional Development",
    featured: false,
    fileName: "Personality Development Certification.PNG",
    imagePath: "/certificates/Personality Development Certification.PNG",
    logo: "/logos/ugmn.svg"
  },
  {
    id: "cert-22",
    title: "Create a Profile and Network on LinkedIn",
    issuer: "Coursera",
    category: "Professional Development",
    featured: false,
    fileName: "Create a Profile and Network on LinkedIn.PNG",
    imagePath: "/certificates/Create a Profile and Network on LinkedIn.PNG",
    logo: "/logos/coursera.svg"
  },
  {
    id: "cert-23",
    title: "Create a Resume and Cover Letter with Word",
    issuer: "Coursera",
    category: "Professional Development",
    featured: false,
    fileName: "Create a Resume and Cover Letter with Word.PNG",
    imagePath: "/certificates/Create a Resume and Cover Letter with Word.PNG",
    logo: "/logos/coursera.svg"
  },

  // --- Leadership, Volunteering & Memberships ---
  {
    id: "cert-24",
    title: "IEEE International Student Membership 2024",
    issuer: "IEEE",
    category: "Membership",
    featured: false,
    fileName: "IEEE International Student Membership 2024.PNG",
    imagePath: "/certificates/IEEE International Student Membership 2024.PNG",
    logo: "/logos/ieee.png"
  },
  {
    id: "cert-25",
    title: "IEEE Student Executive Member",
    issuer: "USKT IEEE Cabinet",
    category: "Leadership",
    featured: false,
    fileName: "IEEE Student Executive Member.PNG",
    imagePath: "/certificates/IEEE Student Executive Member.PNG",
    logo: "/logos/uskt.png"
  },
  {
    id: "cert-26",
    title: "IEEE Student Lead Organizer",
    issuer: "USKT IEEE Cabinet",
    category: "Leadership",
    featured: false,
    fileName: "IEEE Student Lead Organizer.PNG",
    imagePath: "/certificates/IEEE Student Lead Organizer.PNG",
    logo: "/logos/uskt.png"
  },
  {
    id: "cert-27",
    title: "Become a Climate Champion",
    issuer: "United Nations",
    category: "Volunteer",
    featured: false,
    fileName: "Become a Climate Champion.PNG",
    imagePath: "/certificates/Become a Climate Champion.PNG",
    logo: "/logos/uncc.png"
  },
  {
    id: "cert-28",
    title: "National Volunteers Corps",
    issuer: "Government of Pakistan",
    category: "Volunteer",
    featured: false,
    fileName: "National Volunteers Corps.PNG",
    imagePath: "/certificates/National Volunteers Corps.PNG",
    logo: "/logos/nvc.png"
  },
  {
    id: "cert-29",
    title: "Social Media Lead, District Level",
    issuer: "Volunteers Leading Governance",
    category: "Leadership",
    featured: false,
    fileName: "Social Media Lead, District Level.PNG",
    imagePath: "/certificates/Social Media Lead, District Level.PNG",
    logo: "/logos/vlgsialkot.png"
  },
  {
    id: "cert-30",
    title: "VLG University Ambassador",
    issuer: "Volunteers Leading Governance",
    category: "Leadership",
    featured: false,
    fileName: "vlg ambassador.PNG",
    imagePath: "/certificates/vlg ambassador.PNG",
    logo: "/logos/vlgsialkot.png"
  },
  {
    id: "cert-31",
    title: "Volunteer Certification",
    issuer: "Volunteers Leading Governance",
    category: "Volunteer",
    featured: false,
    fileName: "Volunteer Certification.PNG",
    imagePath: "/certificates/Volunteer Certification.PNG",
    logo: "/logos/vlgsialkot.png"
  },

  // --- Achievements ---
  {
    id: "cert-32",
    title: "Speed Programming Competition — Winner",
    issuer: "Innovative Lyallpur Event",
    category: "Achievement",
    featured: false,
    fileName: "Speed Programming Competition — Winner.PNG",
    imagePath: "/certificates/Speed Programming Competition — Winner.PNG",
    logo: "/logos/tuf.png"
  }
];