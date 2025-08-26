import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Education } from '../../services/portfolio.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="education" class="py-5 bg-dark-theme">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">Education</h2>
          <p class="section-subtitle">My Academic Background</p>
        </div>

        <div class="timeline">
          <div class="timeline-item" *ngFor="let edu of education">
            <div class="timeline-marker">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="timeline-content">
              <h4 class="edu-title">{{ edu.degree }}</h4>
              <h5 class="edu-subtitle">{{ edu.school }} • {{ edu.location }}</h5>
              <span class="timeline-date">
                {{ formatDate(edu.startDate) }} - {{ formatDate(edu.endDate) }}
              </span>
              <p class="edu-description">{{ edu.description }}</p>
              <p class="edu-gpa" *ngIf="edu.gpa"><strong>GPA:</strong> {{ edu.gpa }}</p>
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

    /* Timeline */
    .timeline {
      position: relative;
      padding-left: 2rem;
      margin-top: 2rem;
    }
    .timeline::before {
      content: '';
      position: absolute;
      left: 28px;
      top: 0;
      bottom: 0;
      width: 3px;
      background: rgba(255,255,255,0.1);
    }
    .timeline-item {
      position: relative;
      margin-bottom: 3rem;
    }

    .timeline-marker {
      position: absolute;
      left: -25px;
      top: 0;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(145deg, #222, #333);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00e0ff;
      font-size: 1.2rem;
      border: 2px solid rgba(0,224,255,0.6);
      box-shadow: 0 0 10px rgba(0,224,255,0.3);
      transition: all 0.3s;
    }

    .timeline-content {
      background: #1a1a1a;
      border-left: 3px solid #00e0ff;
      border-radius: 8px;
      padding: 1.8rem;
      margin-left: 2rem;
      transition: all 0.3s ease;
    }
    .timeline-content:hover {
      transform: translateX(8px);
      border-color: #ff00ff;
      box-shadow: 0 10px 25px rgba(255,0,255,0.2);
    }

    .edu-title {
      color: #00e0ff;
      font-size: 1.5rem;
      margin-bottom: 0.3rem;
    }
    .edu-subtitle {
      color: #aaa;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }
    .timeline-date {
      color: #777;
      font-size: 0.9rem;
      display: block;
      margin-bottom: 0.7rem;
    }
    .edu-description {
      color: #ccc;
      margin-bottom: 0.5rem;
    }
    .edu-gpa {
      color: #00e0ff;
      margin-top: 0.5rem;
    }

    @media (max-width: 768px) {
      .timeline { padding-left: 1rem; }
      .timeline::before { left: 15px; }
      .timeline-marker {
        left: -20px;
        width: 35px;
        height: 35px;
        font-size: 1rem;
      }
      .timeline-content { margin-left: 1rem; padding: 1.2rem; }
      .section-title { font-size: 2.2rem; }
    }
  `]
})
export class EducationComponent implements OnInit {
  education: Education[] = [];

  constructor(private portfolioService: PortfolioService) {}

  async ngOnInit() {
    try {
      this.education = await this.portfolioService.getEducation();
    } catch (error) {
      console.error('Error loading education data:', error);
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
