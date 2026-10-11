export interface ContactConfig {
  whatsapp: string;
  email: string;
  linkedin: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  status: 'Completed' | 'In Progress';
  logo?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Project' | 'Volunteer';
  period: string;
  description?: string;
  responsibilities?: string[];
  skills: string[];
  confidential: boolean;
  publicDescription?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  // Added 'Mobile' to the allowed categories below
  category: 'AI/ML' | 'Computer Vision' | 'Web' | 'Desktop' | 'Mobile' | 'Research' | 'Other';
  description: string;
  technologies: string[];
  status: 'Completed' | 'In Progress' | 'Concept / Development Planning';
  year?: string;
  featured: boolean;
  metrics?: string;
  github?: string;
  demo?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: string;
  date?: string;
  credentialId?: string;
  credentialUrl?: string;
  featured: boolean;
  imagePath?: string;
  fileName?: string;
  logo?: string;
}

export interface Research {
  id: string;
  title: string;
  area: string;
  description: string;
  technologies: string[];
  status: 'Completed' | 'In Progress';
}