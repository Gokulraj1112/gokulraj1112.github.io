import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService, PersonalInfo } from '../../services/portfolio.service';
import { ContactService, ContactMessage } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="py-5 bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="section-title">Get In Touch</h2>
            <p class="section-subtitle">Let's discuss your next project</p>
          </div>
        </div>
        
        <div class="row mt-5">
          <div class="col-lg-4 mb-4">
            <div class="contact-info">
              <div class="contact-item" *ngIf="personalInfo">
                <i class="fas fa-envelope contact-icon"></i>
                <div>
                  <h5 class="text-white">Email</h5>
                  <a [href]="'mailto:' + personalInfo.email" class="text-primary">
                    {{ personalInfo.email }}
                  </a>
                </div>
              </div>
              
              <div class="contact-item" *ngIf="personalInfo">
                <i class="fas fa-phone contact-icon"></i>
                <div>
                  <h5 class="text-white">Phone</h5>
                  <a [href]="'tel:' + personalInfo.phone" class="text-primary">
                    {{ personalInfo.phone }}
                  </a>
                </div>
              </div>
              
              <div class="contact-item" *ngIf="personalInfo">
                <i class="fas fa-map-marker-alt contact-icon"></i>
                <div>
                  <h5 class="text-white">Location</h5>
                  <span class="text-light">{{ personalInfo.location }}</span>
                </div>
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
          
          <div class="col-lg-8">
            <form class="contact-form" (ngSubmit)="onSubmit()" #contactForm="ngForm">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Your Name"
                    [(ngModel)]="formData.name"
                    name="name"
                    required
                  >
                </div>
                <div class="col-md-6 mb-3">
                  <input 
                    type="email" 
                    class="form-control" 
                    placeholder="Your Email"
                    [(ngModel)]="formData.email"
                    name="email"
                    required
                  >
                </div>
              </div>
              <div class="mb-3">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Subject"
                  [(ngModel)]="formData.subject"
                  name="subject"
                  required
                >
              </div>
              <div class="mb-3">
                <textarea 
                  class="form-control" 
                  rows="6" 
                  placeholder="Your Message"
                  [(ngModel)]="formData.message"
                  name="message"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                class="btn btn-primary btn-lg w-100"
                [disabled]="!contactForm.valid || isSubmitting"
              >
                <i class="fas fa-paper-plane me-2" *ngIf="!isSubmitting"></i>
                <i class="fas fa-spinner fa-spin me-2" *ngIf="isSubmitting"></i>
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
              
              <div class="alert alert-success mt-3" *ngIf="showSuccessMessage">
                <i class="fas fa-check-circle me-2"></i>
                Message sent successfully! I'll get back to you soon.
              </div>
              
              <div class="alert alert-danger mt-3" *ngIf="showErrorMessage">
                <i class="fas fa-exclamation-triangle me-2"></i>
                {{ errorMessage }}
              </div>
            </form>
          </div>
        </div>
        
        <!-- Admin Panel for viewing messages (hidden by default) -->
        <div class="row mt-5" *ngIf="showAdminPanel">
          <div class="col-12">
            <div class="admin-panel">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-white">Messages ({{ messages.length }})</h4>
                <div>
                  <button class="btn btn-sm btn-outline-primary me-2" (click)="refreshMessages()">
                    <i class="fas fa-refresh me-1"></i>Refresh
                  </button>
                  <button class="btn btn-sm btn-outline-danger" (click)="exportMessages()">
                    <i class="fas fa-download me-1"></i>Export
                  </button>
                </div>
              </div>
              
              <div class="message-list">
                <div class="message-item card mb-3" *ngFor="let msg of messages">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <h6 class="text-white mb-0">{{ msg.name }} ({{ msg.email }})</h6>
                      <span class="badge" [class]="getStatusBadgeClass(msg.status)">
                        {{ msg.status }}
                      </span>
                    </div>
                    <p class="text-primary mb-1"><strong>{{ msg.subject }}</strong></p>
                    <p class="text-light mb-2">{{ msg.message }}</p>
                    <small class="text-muted">{{ formatTimestamp(msg.timestamp) }}</small>
                  </div>
                </div>
                
                <div class="text-center text-muted" *ngIf="messages.length === 0">
                  No messages yet.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
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

    .contact-info {
      padding: 2rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      height: 100%;
    }

    .contact-item {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .contact-item:last-of-type {
      border-bottom: none;
    }

    .contact-icon {
      width: 50px;
      height: 50px;
      background: var(--bs-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      margin-right: 1rem;
      font-size: 1.2rem;
    }

    .contact-form {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 2rem;
    }

    .form-control {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 5px;
      color: white;
      padding: 1rem;
      transition: all 0.3s ease;
    }

    .form-control:focus {
      background: rgba(255, 255, 255, 0.15);
      border-color: var(--bs-primary);
      box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
      color: white;
    }

    .form-control::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }

    .social-links {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .social-link {
      width: 45px;
      height: 45px;
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
      transform: translateY(-3px);
    }

    .btn-primary {
      transition: all 0.3s ease;
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }
    
    .alert {
      border: none;
      border-radius: 8px;
    }
    
    .alert-success {
      background: rgba(40, 167, 69, 0.2);
      color: #28a745;
      border: 1px solid rgba(40, 167, 69, 0.3);
    }
    
    .alert-danger {
      background: rgba(220, 53, 69, 0.2);
      color: #dc3545;
      border: 1px solid rgba(220, 53, 69, 0.3);
    }
    
    .admin-panel {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 2rem;
      margin-top: 2rem;
    }
    
    .message-list {
      max-height: 400px;
      overflow-y: auto;
    }
    
    .message-item {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .badge {
      font-size: 0.75rem;
    }
    
    .badge.bg-warning {
      background-color: #ffc107 !important;
      color: #000;
    }
    
    .badge.bg-success {
      background-color: #28a745 !important;
    }
    
    .badge.bg-danger {
      background-color: #dc3545 !important;
    }

    @media (max-width: 768px) {
      .section-title {
        font-size: 2.5rem;
      }
      
      .contact-info {
        margin-bottom: 2rem;
      }
      
      .contact-item {
        flex-direction: column;
        text-align: center;
      }
      
      .contact-icon {
        margin-right: 0;
        margin-bottom: 1rem;
      }
    }
  `]
})
export class ContactComponent implements OnInit {
  personalInfo: PersonalInfo | null = null;
  messages: ContactMessage[] = [];
  showAdminPanel = false;
  isSubmitting = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  errorMessage = '';
  
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(
    private portfolioService: PortfolioService,
    private contactService: ContactService
  ) {
    // Enable admin panel with a secret key combination
    this.checkAdminAccess();
  }

  async ngOnInit() {
    try {
      this.personalInfo = await this.portfolioService.getPersonalInfo();
    } catch (error) {
      console.error('Error loading personal info:', error);
    }
    
    this.refreshMessages();
  }

  async onSubmit() {
    if (!this.isSubmitting) {
      this.isSubmitting = true;
      this.showSuccessMessage = false;
      this.showErrorMessage = false;
      
      try {
        await this.contactService.saveMessage({
          name: this.formData.name,
          email: this.formData.email,
          subject: this.formData.subject,
          message: this.formData.message
        });
        
        // Reset form
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
        
        this.showSuccessMessage = true;
        this.refreshMessages();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
        
      } catch (error) {
        this.errorMessage = 'Failed to send message. Please try again.';
        this.showErrorMessage = true;
        
        // Hide error message after 5 seconds
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 5000);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
  
  refreshMessages() {
    this.messages = this.contactService.getAllMessages();
  }
  
  exportMessages() {
    const dataStr = this.contactService.exportMessages();
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-messages-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
  
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'sent': return 'bg-success';
      case 'failed': return 'bg-danger';
      case 'pending': return 'bg-warning';
      default: return 'bg-secondary';
    }
  }
  
  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleString();
  }
  
  private checkAdminAccess() {
    // Enable admin panel by typing "admin" in console or adding ?admin=true to URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      this.showAdminPanel = true;
    }
    
    // Also check localStorage for admin flag
    if (localStorage.getItem('portfolio_admin') === 'true') {
      this.showAdminPanel = true;
    }
  }
}