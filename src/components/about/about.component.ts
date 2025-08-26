import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, About } from '../../services/portfolio.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-5 bg-dark-theme">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="section-title">About Me</h2>
            <p class="section-subtitle">Get to know me better</p>
          </div>
        </div>
        
        <div class="row mt-5" *ngIf="aboutData">
          <div class="col-lg-6">
            <div class="about-content">
              <p class="text-light lead">{{ aboutData.description }}</p>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="highlights">
              <h4 class="text-white mb-3">Key Highlights</h4>
              <ul class="list-unstyled">
                <li class="highlight-item" *ngFor="let highlight of aboutData.highlights">
                  <i class="fas fa-check-circle neon-icon me-2"></i>
                  <span class="text-light">{{ highlight }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .bg-dark-theme { background-color: #111; }

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
      background: linear-gradient(to right, #00e0ff, #ff00ff);
      border-radius: 2px;
    }

    .section-subtitle {
      color: #6c757d;
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }

    .about-content {
      padding-right: 2rem;
    }

    .highlight-item {
      margin-bottom: 1rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
    }

    .highlight-item:hover {
      padding-left: 1rem;
      border-color: #00e0ff;
    }

    .highlight-item:last-child {
      border-bottom: none;
    }

    .neon-icon {
      color: #00e0ff;
      transition: 0.3s ease;
    }

    .highlight-item:hover .neon-icon {
      text-shadow: 0 0 5px #00e0ff, 0 0 10px #ff00ff;
      transform: scale(1.2);
    }

    @media (max-width: 768px) {
      .about-content {
        padding-right: 0;
        margin-bottom: 2rem;
      }
      
      .section-title {
        font-size: 2.5rem;
      }
    }
  `]
})
export class AboutComponent implements OnInit {
  aboutData: About | null = null;

  constructor(private portfolioService: PortfolioService) {}

  async ngOnInit() {
    try {
      this.aboutData = await this.portfolioService.getAbout();
    } catch (error) {
      console.error('Error loading about data:', error);
    }
  }
}
