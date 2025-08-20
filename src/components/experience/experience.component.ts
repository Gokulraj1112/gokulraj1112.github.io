import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Experience } from '../../services/portfolio.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-5 bg-darker">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="section-title">Work Experience</h2>
            <p class="section-subtitle">My professional journey</p>
          </div>
        </div>
        
        <div class="row mt-5">
          <div class="col-lg-8 mx-auto">
            <div class="timeline">
              <div class="timeline-item" *ngFor="let exp of experience; let i = index">
                <div class="timeline-marker" [class.current]="exp.current">
                  <i class="fas fa-briefcase"></i>
                </div>
                <div class="timeline-content">
                  <div class="timeline-header">
                    <h4 class="text-white mb-1">{{ exp.title }}</h4>
                    <h5 class="text-primary mb-2">{{ exp.company }} • {{ exp.location }}</h5>
                    <span class="timeline-date">
                      {{ formatDate(exp.startDate) }} - 
                      {{ exp.current ? 'Present' : formatDate(exp.endDate!) }}
                    </span>
                  </div>
                  <p class="text-light mt-3">{{ exp.description }}</p>
                  <ul class="achievements mt-3">
                    <li *ngFor="let achievement of exp.achievements" class="text-light">
                      {{ achievement }}
                    </li>
                  </ul>
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

    .timeline {
      position: relative;
      padding-left: 2rem;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 25px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: rgba(255, 255, 255, 0.2);
    }

    .timeline-item {
      position: relative;
      margin-bottom: 3rem;
    }

    .timeline-marker {
      position: absolute;
      left: -37px;
      top: 0;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--bs-primary);
      border: 2px solid rgba(255, 255, 255, 0.2);
      z-index: 2;
    }

    .timeline-marker.current {
      background: var(--bs-primary);
      color: white;
      box-shadow: 0 0 20px rgba(0, 123, 255, 0.5);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(0, 123, 255, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
    }

    .timeline-content {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 2rem;
      margin-left: 2rem;
      transition: all 0.3s ease;
    }

    .timeline-content:hover {
      transform: translateX(10px);
      border-color: var(--bs-primary);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .timeline-date {
      color: #6c757d;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .achievements {
      list-style: none;
      padding-left: 0;
    }

    .achievements li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .achievements li::before {
      content: '▶';
      position: absolute;
      left: 0;
      color: var(--bs-primary);
    }

    @media (max-width: 768px) {
      .timeline {
        padding-left: 1rem;
      }
      
      .timeline::before {
        left: 15px;
      }
      
      .timeline-marker {
        left: -22px;
        width: 35px;
        height: 35px;
      }
      
      .timeline-content {
        margin-left: 1rem;
        padding: 1.5rem;
      }
      
      .section-title {
        font-size: 2.5rem;
      }
    }
  `]
})
export class ExperienceComponent implements OnInit {
  experience: Experience[] = [];

  constructor(private portfolioService: PortfolioService) {}

  async ngOnInit() {
    try {
      this.experience = await this.portfolioService.getExperience();
    } catch (error) {
      console.error('Error loading experience data:', error);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  }
}