import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Project } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="py-5 bg-dark-theme">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">Featured Projects</h2>
          <p class="section-subtitle">💡 "Where creativity meets code and innovation takes shape."</p>
        </div>
        
        <div class="row mt-5">
          <div class="col-lg-6 mb-4" *ngFor="let project of projects">
            <div class="project-card card h-100">
              <div class="project-image">
                <img [src]="project.image" [alt]="project.title" class="card-img-top">
                <div class="project-overlay">
                  <div class="project-actions">
                    <a [href]="project.liveUrl" class="btn btn-neon" target="_blank">
                      <i class="fas fa-external-link-alt me-2"></i>Live Demo
                    </a>
                    <a [href]="project.githubUrl" class="btn btn-outline-neon" target="_blank">
                      <i class="fab fa-github me-2"></i>Code
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ project.title }}</h5>
                <p class="card-text">{{ project.description }}</p>
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
            <button class="btn btn-outline-neon btn-lg" (click)="showAllProjects = !showAllProjects">
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
                    <a [href]="project.liveUrl" class="btn btn-neon" target="_blank">
                      <i class="fas fa-external-link-alt me-2"></i>Live Demo
                    </a>
                    <a [href]="project.githubUrl" class="btn btn-outline-neon" target="_blank">
                      <i class="fab fa-github me-2"></i>Code
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ project.title }}</h5>
                <p class="card-text">{{ project.description }}</p>
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
    .bg-dark-theme { background-color: #111; color: #f0f0f0; }

    .section-title {
      font-size: 2.8rem;
      font-weight: 700;
      color: #00e0ff;
      margin-bottom: 0.5rem;
      position: relative;
    }
    .section-title::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(to right, #00e0ff, #ff00ff);
      border-radius: 2px;
    }
    .section-subtitle { color: #aaa; font-size: 1.2rem; }

    .project-card {
      background: #1a1a1a;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      transition: all 0.3s ease;
      overflow: hidden;
    }
    .project-card:hover { 
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0,224,255,0.3);
      border-color: #00e0ff;
    }

    .project-image { position: relative; overflow: hidden; height: 220px; }
    .project-image img {
      width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;
    }
    .project-card:hover .project-image img { transform: scale(1.1); }

    .project-overlay {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.3s ease;
    }
    .project-card:hover .project-overlay { opacity: 1; }

    .project-actions { display: flex; gap: 0.8rem; flex-wrap: wrap; }
    .btn-neon {
      background: linear-gradient(45deg,#00e0ff,#ff00ff);
      color: #fff; border: none;
      box-shadow: 0 0 15px #00e0ff, 0 0 25px #ff00ff;
      transition: all 0.3s ease;
    }
    .btn-neon:hover { box-shadow: 0 0 20px #00e0ff, 0 0 30px #ff00ff; transform: translateY(-2px); }

    .btn-outline-neon {
      color: #00e0ff; border: 1px solid #00e0ff;
      background: transparent;
      transition: all 0.3s ease;
    }
    .btn-outline-neon:hover {
      background: #00e0ff; color: #111;
      box-shadow: 0 0 15px #00e0ff;
      transform: translateY(-2px);
    }

    .card-body { background: transparent; }
    .card-title { color: #00e0ff; margin-bottom: 0.5rem; }
    .card-text { color: #ccc; }
    .project-technologies { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.8rem; }
    .tech-badge {
      background: rgba(0,224,255,0.1); color: #00e0ff;
      padding: 0.25rem 0.75rem; border-radius: 20px;
      font-size: 0.875rem; border: 1px solid rgba(0,224,255,0.3);
    }

    @media (max-width: 768px) {
      .section-title { font-size: 2.2rem; }
      .project-actions { flex-direction: column; width: 80%; margin: 0 auto; }
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
