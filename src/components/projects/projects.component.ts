import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Project } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="py-5 bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="section-title">Featured Projects</h2>
            <p class="section-subtitle">Some of my recent work</p>
          </div>
        </div>
        
        <div class="row mt-5">
          <div class="col-lg-6 mb-4" *ngFor="let project of projects">
            <div class="project-card card h-100">
              <div class="project-image">
                <img [src]="project.image" [alt]="project.title" class="card-img-top">
                <div class="project-overlay">
                  <div class="project-actions">
                    <a [href]="project.liveUrl" class="btn btn-primary" target="_blank">
                      <i class="fas fa-external-link-alt me-2"></i>Live Demo
                    </a>
                    <a [href]="project.githubUrl" class="btn btn-outline-light" target="_blank">
                      <i class="fab fa-github me-2"></i>Code
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title text-white">{{ project.title }}</h5>
                <p class="card-text text-light">{{ project.description }}</p>
                <div class="project-technologies">
                  <span class="tech-badge" *ngFor="let tech of project.technologies">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row mt-4">
          <div class="col-12 text-center">
            <button class="btn btn-outline-primary btn-lg" (click)="showAllProjects = !showAllProjects">
              {{ showAllProjects ? 'Show Less' : 'View All Projects' }}
            </button>
          </div>
        </div>
        
        <div class="row mt-4" *ngIf="showAllProjects">
          <div class="col-lg-6 mb-4" *ngFor="let project of allProjects">
            <div class="project-card card h-100" *ngIf="!project.featured">
              <div class="project-image">
                <img [src]="project.image" [alt]="project.title" class="card-img-top">
                <div class="project-overlay">
                  <div class="project-actions">
                    <a [href]="project.liveUrl" class="btn btn-primary" target="_blank">
                      <i class="fas fa-external-link-alt me-2"></i>Live Demo
                    </a>
                    <a [href]="project.githubUrl" class="btn btn-outline-light" target="_blank">
                      <i class="fab fa-github me-2"></i>Code
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title text-white">{{ project.title }}</h5>
                <p class="card-text text-light">{{ project.description }}</p>
                <div class="project-technologies">
                  <span class="tech-badge" *ngFor="let tech of project.technologies">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-title {
      font-size: 3rem;
      font-weight: 700;
      color: white;
      margin-bottom: 1rem;
      position: relative;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(to right, var(--bs-primary), var(--bs-info));
      border-radius: 2px;
    }

    .section-subtitle {
      color: #6c757d;
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }

    .project-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      border-color: var(--bs-primary);
    }

    .project-image {
      position: relative;
      overflow: hidden;
      height: 200px;
    }

    .project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .project-card:hover .project-image img {
      transform: scale(1.1);
    }

    .project-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .project-card:hover .project-overlay {
      opacity: 1;
    }

    .project-actions {
      display: flex;
      gap: 1rem;
    }

    .project-technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .tech-badge {
      background: rgba(0, 123, 255, 0.2);
      color: var(--bs-primary);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      border: 1px solid rgba(0, 123, 255, 0.3);
    }

    @media (max-width: 768px) {
      .section-title {
        font-size: 2.5rem;
      }
      
      .project-actions {
        flex-direction: column;
        width: 80%;
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  allProjects: Project[] = [];
  showAllProjects = false;

  constructor(private portfolioService: PortfolioService) {}

  async ngOnInit() {
    try {
      this.projects = await this.portfolioService.getFeaturedProjects();
      this.allProjects = await this.portfolioService.getProjects();
    } catch (error) {
      console.error('Error loading projects data:', error);
    }
  }
}