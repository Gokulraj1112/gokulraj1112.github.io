import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, PersonalInfo } from '../../services/portfolio.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg fixed-top" [class.scrolled]="isScrolled">
      <div class="container">
        <a class="navbar-brand" href="#" *ngIf="personalInfo">
          <span class="fw-bold">{{ personalInfo.name }}</span>
        </a>
        
        <button 
          class="navbar-toggler"
          type="button"
          (click)="toggleNavbar()"
          [attr.aria-expanded]="isNavbarCollapsed"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="navbar-collapse" [class.show]="!isNavbarCollapsed">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="#about" (click)="closeNavbar()">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#skills" (click)="closeNavbar()">Skills</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#projects" (click)="closeNavbar()">Projects</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#experience" (click)="closeNavbar()">Experience</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contact" (click)="closeNavbar()">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: rgba(10, 10, 10, 0.9);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      padding: 1rem 0;
    }

    .navbar.scrolled {
      background: rgba(10, 10, 10, 0.95);
      padding: 0.5rem 0;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }

    .navbar-brand {
      color: white !important;
      font-size: 1.5rem;
      text-decoration: none;
    }

    .navbar-brand:hover {
      color: var(--bs-primary) !important;
    }

    .navbar-toggler {
      border: none;
      padding: 0.25rem 0.5rem;
    }

    .navbar-toggler:focus {
      box-shadow: none;
    }

    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }

    .nav-link {
      color: rgba(255, 255, 255, 0.8) !important;
      font-weight: 500;
      padding: 0.5rem 1rem !important;
      transition: all 0.3s ease;
      position: relative;
    }

    .nav-link:hover {
      color: var(--bs-primary) !important;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background: var(--bs-primary);
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    .nav-link:hover::after {
      width: 80%;
    }

    @media (max-width: 991px) {
      .navbar-collapse {
        background: rgba(10, 10, 10, 0.95);
        border-radius: 10px;
        margin-top: 1rem;
        padding: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .nav-link {
        text-align: center;
        padding: 0.75rem 1rem !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .nav-link:last-child {
        border-bottom: none;
      }
    }
  `]
})
export class NavigationComponent implements OnInit {
  personalInfo: PersonalInfo | null = null;
  isScrolled = false;
  isNavbarCollapsed = true;

  constructor(private portfolioService: PortfolioService) {}

  async ngOnInit() {
    try {
      this.personalInfo = await this.portfolioService.getPersonalInfo();
    } catch (error) {
      console.error('Error loading personal info:', error);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  closeNavbar() {
    this.isNavbarCollapsed = true;
  }
}