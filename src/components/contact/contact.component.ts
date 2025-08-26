import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, User } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="contact-section bg-dark-theme">
      <div class="container">
        <h2 class="section-title text-center">Contact Me</h2>

        <form (ngSubmit)="submitForm()" #contactForm="ngForm" class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input id="name" name="name" [(ngModel)]="formData.name" required />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" name="email" [(ngModel)]="formData.email" required />
          </div>

          <div class="form-group">
            <label for="phoneNumber">Phone Number</label>
            <input id="phoneNumber" name="phoneNumber" [(ngModel)]="formData.phoneNumber" required />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" [(ngModel)]="formData.message" required></textarea>
          </div>

          <button type="submit" [disabled]="loading">
            {{ loading ? 'Sending...' : 'Send Message' }}
          </button>
        </form>

        <p *ngIf="successMessage" class="success">{{ successMessage }}</p>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </section>
  `,
  styles: [`
    .bg-dark-theme { background-color: #111; padding: 40px 20px; border-radius: 12px; }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: white;
      margin-bottom: 2rem;
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

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      max-width: 500px;
      margin: 0 auto;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    label {
      margin-bottom: 5px;
      font-weight: bold;
      color: #ccc;
    }

    input, textarea {
      padding: 10px;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 6px;
      background: #1a1a1a;
      color: white;
      transition: all 0.3s ease;
    }

    input:focus, textarea:focus {
      border-color: #00e0ff;
      box-shadow: 0 0 10px #00e0ff;
      outline: none;
    }

    textarea {
      min-height: 120px;
      resize: vertical;
    }

    button {
      background: linear-gradient(to right, #00e0ff, #ff00ff);
      color: white;
      border: none;
      padding: 12px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 0 10px #00e0ff, 0 0 20px #ff00ff;
    }

    button:disabled {
      background: #6c757d;
      cursor: not-allowed;
      box-shadow: none;
    }

    .success, .error {
      text-align: center;
      margin-top: 15px;
      font-weight: bold;
      text-shadow: 0 0 2px black;
    }

    .success { color: #00e0ff; }
    .error { color: #ff4d4f; }

    @media (max-width: 768px) {
      .section-title { font-size: 2rem; }
    }
  `]
})
export class ContactComponent {
  formData: User = { name: '', email: '', phoneNumber: '', message: '' };
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private contactService: ContactService) {}

  async submitForm() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    try {
      await this.contactService.addUser(this.formData);
      this.successMessage = 'Your message has been sent successfully!';
      this.formData = { name: '', email: '', phoneNumber: '', message: '' };
    } catch (err) {
      console.error(err);
      this.errorMessage = 'Failed to send your message. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}
