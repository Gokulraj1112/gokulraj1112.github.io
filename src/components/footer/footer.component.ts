import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, PersonalInfo } from '../../services/portfolio.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer bg-dark-theme py-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <p class="text-light mb-0" *ngIf="personalInfo">
              © {{ currentYear }} {{ personalInfo.name }}. All rights reserved.
            </p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <div class="social-links" *ngIf="personalInfo">
              <a [href]="personalInfo.github" class="social-link neon" target="_blank">
                <i class="fab fa-github"></i>
              </a>
              <a [href]="personalInfo.linkedin" class="social-link neon" target="_blank">
                <i class="fab fa-linkedin"></i>
              </a>
              <a [href]="personalInfo.twitter" class="social-link neon" target="_blank">
                <i class="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .bg-dark-theme { background-color: #111; }

    .footer { border-top: 1px solid rgba(255, 255, 255, 0.1); }

    .social-links {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .social-link {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00e0ff;
      font-size: 1.2rem;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      color: #fff;
      background: linear-gradient(45deg, #00e0ff, #ff00ff);
      box-shadow: 0 0 10px #00e0ff, 0 0 20px #ff00ff;
      transform: translateY(-3px) scale(1.1);
    }

    @media (max-width: 768px) {
      .social-links { justify-content: center; margin-top: 1rem; }
    }
  `]
})
export class FooterComponent implements OnInit {
  personalInfo: PersonalInfo | null = null;
  currentYear = new Date().getFullYear();

  constructor(private portfolioService: PortfolioService) {}

  async ngOnInit() {
    try {
      this.personalInfo = await this.portfolioService.getPersonalInfo();
    } catch (error) {
      console.error('Error loading personal info:', error);
    }
  }
}
