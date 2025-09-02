import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, SkillCategory } from '../../services/portfolio.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="py-5 bg-dark-theme">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">Skills & Technologies</h2>
          <p class="section-subtitle">🌐 “The technologies I speak fluently (no Google Translate needed 😉).”</p>
        </div>
        
        <div class="row mt-5">
          <div class="col-lg-6 col-xl-3 mb-4" *ngFor="let skillCategory of skills">
            <div class="skill-category card h-100">
              <div class="card-header">
                <h4 class="skill-category-title">{{ skillCategory.category }}</h4>
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
    .bg-dark-theme {
      background-color: #111;
      color: #f0f0f0;
    }

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
    .section-subtitle {
      color: #aaa;
      font-size: 1.2rem;
    }

    .skill-category {
      background: #1a1a1a;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .skill-category:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(255, 0, 255, 0.2);
      border-color: #00e0ff;
    }

    .skill-category .card-header {
      background: #1a1a1a;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .skill-category-title {
      color: #00e0ff;
      font-weight: 600;
    }

    .skill-category .card-body {
      background: transparent;
    }

    .skill-item {
      margin-bottom: 1.5rem;
    }

    .skill-name {
      color: #f0f0f0;
      font-weight: 500;
    }

    .skill-icon {
      font-size: 1.2rem;
    }

    .skill-percentage {
      color: #00e0ff;
      font-weight: 600;
    }

    .skill-progress {
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }

    .skill-progress .progress-bar {
      background: linear-gradient(to right, #00e0ff, #ff00ff);
      border-radius: 4px;
      transition: width 1s ease-in-out;
      box-shadow: 0 0 10px rgba(0, 224, 255, 0.5);
    }

    @media (max-width: 768px) {
      .section-title { font-size: 2.2rem; }
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
