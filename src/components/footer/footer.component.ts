import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, PersonalInfo } from '../../services/portfolio.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer bg-darker py-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="text-light mb-0" *ngIf="personalInfo">
              © {{ currentYear }} {{ personalInfo.name }}. All rights reserved.
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="social-links" *ngIf="personalInfo">
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
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .bg-darker {
      background-color: #0a0a0a !important;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }

    .social-link {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background: var(--bs-primary);
      color: white;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .social-links {
        justify-content: center;
        margin-top: 1rem;
      }
      
      .col-md-6.text-md-end {
        text-align: center !important;
      }
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