import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Certification } from '../../services/portfolio.service';

@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="certifications" class="py-5 bg-dark-theme">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">Certifications</h2>
          <p class="section-subtitle">🏆 "Every certificate tells a story of growth."</p>
        </div>

        <div class="timeline">
          <div class="timeline-item" *ngFor="let cert of certifications">
            <div class="timeline-marker">
              <i class="fas fa-certificate"></i>
            </div>
            <div class="timeline-content">
              <h4 class="cert-title">{{ cert.name || cert.degree }}</h4>
              <h5 class="cert-subtitle">
                {{ cert.issuer || cert.school }}
                <span *ngIf="cert.location"> • {{ cert.location }}</span>
              </h5>
              <span class="timeline-date">
                {{ formatDate(cert.date || cert.startDate) }}
                <span *ngIf="cert.expiryDate || cert.endDate">
                  - {{ formatDate(cert.expiryDate || cert.endDate) }}
                </span>
              </span>
              <p class="cert-description">{{ cert.description }}</p>
              <a *ngIf="cert.link"
                 [href]="cert.link"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="btn btn-sm btn-outline-info mt-2">
                 <i class="fas fa-external-link-alt me-1"></i> View Certificate
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Background */
    .bg-dark-theme {
      background-color: #111;
      color: #f0f0f0;
    }

    /* Titles */
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
      border: 2px solid rgba(0, 224, 255, 0.6);
      box-shadow: 0 0 10px rgba(0,224,255,0.3);
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

    .cert-title {
      color: #00e0ff;
      font-size: 1.5rem;
      margin-bottom: 0.3rem;
    }
    .cert-subtitle {
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
    .cert-description {
      color: #ccc;
      margin-bottom: 0.5rem;
    }

    /* Buttons */
    .btn-outline-info {
      color: #00e0ff;
      border-color: #00e0ff;
      font-size: 0.85rem;
      padding: 0.35rem 0.75rem;
      transition: all 0.3s;
    }
    .btn-outline-info:hover {
      background: #00e0ff;
      color: #111;
      border-color: #00e0ff;
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
export class CertificationComponent implements OnInit {
  certifications: (Certification | any)[] = [];

  constructor(private portfolioService: PortfolioService) {}

  async ngOnInit() {
    try {
      this.certifications = await this.portfolioService.getCertifications();
    } catch (error) {
      console.error('Error loading certifications:', error);
    }
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
}
