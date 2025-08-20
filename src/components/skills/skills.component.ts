import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, SkillCategory } from '../../services/portfolio.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="py-5 bg-darker">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="section-title">Skills & Technologies</h2>
            <p class="section-subtitle">Technologies I work with</p>
          </div>
        </div>
        
        <div class="row mt-5">
          <div class="col-lg-6 col-xl-3 mb-4" *ngFor="let skillCategory of skills">
            <div class="skill-category card h-100">
              <div class="card-header">
                <h4 class="text-primary mb-0">{{ skillCategory.category }}</h4>
              </div>
              <div class="card-body">
                <div class="skill-item" *ngFor="let tech of skillCategory.technologies">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="skill-name">
                      <span class="skill-icon me-2">{{ tech.icon }}</span>
                      {{ tech.name }}
                    </span>
                    <span class="skill-percentage">{{ tech.level }}%</span>
                  </div>
                  <div class="progress skill-progress">
                    <div 
                      class="progress-bar"
                      [style.width.%]="tech.level"
                      role="progressbar">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .bg-darker {
      background-color: #0a0a0a !important;
    }

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

    .skill-category {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }

    .skill-category:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      border-color: var(--bs-primary);
    }

    .skill-category .card-header {
      background: rgba(255, 255, 255, 0.05);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .skill-category .card-body {
      background: transparent;
    }

    .skill-item {
      margin-bottom: 1.5rem;
    }

    .skill-name {
      color: white;
      font-weight: 500;
    }

    .skill-icon {
      font-size: 1.2rem;
    }

    .skill-percentage {
      color: var(--bs-primary);
      font-weight: 600;
    }

    .skill-progress {
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }

    .skill-progress .progress-bar {
      background: linear-gradient(to right, var(--bs-primary), var(--bs-info));
      border-radius: 4px;
      transition: width 1s ease-in-out;
    }

    @media (max-width: 768px) {
      .section-title {
        font-size: 2.5rem;
      }
    }
  `]
})
export class SkillsComponent implements OnInit {
  skills: SkillCategory[] = [];

  constructor(private portfolioService: PortfolioService) {}

  async ngOnInit() {
    try {
      this.skills = await this.portfolioService.getSkills();
    } catch (error) {
      console.error('Error loading skills data:', error);
    }
  }
}