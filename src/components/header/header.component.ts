import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PortfolioService, PersonalInfo } from '../../services/portfolio.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ])
    ])
  ],
  template: `
    <header class="hero-section">
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6 order-2 order-lg-1">
            <div class="hero-content" [@slideInLeft]>
              <h1 class="display-4 fw-bold text-white mb-3">
                Hi, I'm {{ personalInfo?.name }}
              </h1>
              <h2 class="h3 text-primary mb-4">{{ personalInfo?.title }}</h2>
              <p class="lead text-light mb-4">{{ personalInfo?.bio }}</p>
              <div class="hero-buttons">
                <a href="#contact" class="btn btn-primary btn-lg me-3">Get In Touch</a>
                <a href="#projects" class="btn btn-outline-light btn-lg">View My Work</a>
              </div>
              <div class="social-links mt-4" *ngIf="personalInfo">
                <a [href]="personalInfo.github" class="social-link" target="_blank">
                  <i class="fab fa-github"></i>
                </a>
                <a [href]="personalInfo.linkedin" class="social-link" target="_blank">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a [href]="personalInfo.twitter" class="social-link" target="_blank">
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-6 order-1 order-lg-2 text-center">
            <div class="hero-image" [@slideInRight]>
              <img 
                [src]="personalInfo?.avatar" 
                [alt]="personalInfo?.name"
                class="img-fluid rounded-circle hero-avatar"
              >
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      position: relative;
      overflow: hidden;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
      opacity: 0.1;
    }

    .hero-content {
      position: relative;
      z-index: 2;
    }

    .hero-avatar {
      width: 300px;
      height: 300px;
      object-fit: cover;
      border: 5px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease;
    }

    .hero-avatar:hover {
      transform: scale(1.05);
    }

    .social-links {
      display: flex;
      gap: 1rem;
    }

    .social-link {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .social-link:hover {
      background: var(--bs-primary);
      color: white;
      transform: translateY(-5px);
    }

    .hero-buttons .btn {
      transition: all 0.3s ease;
    }

    .hero-buttons .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 768px) {
      .hero-avatar {
        width: 200px;
        height: 200px;
      }
      
      .hero-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .hero-buttons .btn {
        width: 100%;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  personalInfo: PersonalInfo | null = null;

  constructor(private portfolioService: PortfolioService) {}

  async ngOnInit() {
    try {
      this.personalInfo = await this.portfolioService.getPersonalInfo();
    } catch (error) {
      console.error('Error loading personal info:', error);
    }
  }
}