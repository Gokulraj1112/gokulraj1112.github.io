import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  bio: string;
  avatar: string;
}

export interface About {
  description: string;
  highlights: string[];
}

export interface Technology {
  name: string;
  level: number;
  icon: string;
}

export interface SkillCategory {
  category: string;
  technologies: Technology[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface Testimonial {
  name: string;
  position: string;
  company: string;
  content: string;
  avatar: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  about: About;
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  testimonials: Testimonial[];
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private portfolioData: PortfolioData | null = null;

  constructor(private http: HttpClient) {}

  async getPortfolioData(): Promise<PortfolioData> {
    if (this.portfolioData) {
      return this.portfolioData;
    }

    try {
      const response = await fetch('assets/data/portfolio.json');
      this.portfolioData = await response.json();
      return this.portfolioData!;
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      throw error;
    }
  }

  getPersonalInfo(): Promise<PersonalInfo> {
    return this.getPortfolioData().then(data => data.personal);
  }

  getAbout(): Promise<About> {
    return this.getPortfolioData().then(data => data.about);
  }

  getSkills(): Promise<SkillCategory[]> {
    return this.getPortfolioData().then(data => data.skills);
  }

  getProjects(): Promise<Project[]> {
    return this.getPortfolioData().then(data => data.projects);
  }

  getFeaturedProjects(): Promise<Project[]> {
    return this.getPortfolioData().then(data => 
      data.projects.filter(project => project.featured)
    );
  }

  getExperience(): Promise<Experience[]> {
    return this.getPortfolioData().then(data => data.experience);
  }

  getEducation(): Promise<Education[]> {
    return this.getPortfolioData().then(data => data.education);
  }

  getTestimonials(): Promise<Testimonial[]> {
    return this.getPortfolioData().then(data => data.testimonials);
  }
}
