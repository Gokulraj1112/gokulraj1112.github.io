import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="py-5 bg-dark-theme">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">Get in Touch</h2>
          <p class="section-subtitle">🚀 From concept to creation, every journey starts with hello.</p>
        </div>

        <div class="form-wrapper">
          <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
            <div class="form-group">
              <input type="text" name="name" [(ngModel)]="formData.name" placeholder="Your Name" required />
            </div>
            <div class="form-group">
              <input type="email" name="email" [(ngModel)]="formData.email" placeholder="Your Email" required />
            </div>
            <div class="form-group">
              <input type="tel" name="phone" [(ngModel)]="formData.phone" placeholder="Your Contact Number" required />
            </div>
            <div class="form-group">
              <textarea name="message" [(ngModel)]="formData.message" placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn-submit" [disabled]="loading || contactForm.invalid">
              {{ loading ? 'Sending...' : 'Send Message' }}
            </button>
          </form>

          <!-- Success & Error Messages -->
          <p *ngIf="successMessage" class="success-msg">{{ successMessage }}</p>
          <p *ngIf="errorMessage" class="error-msg">{{ errorMessage }}</p>
        </div>
      </div>
    </section>
  `,
    styles: [`
    .bg-dark-theme {
      background-color: #111;
      color: #f0f0f0;
      min-height: 100vh;
      display: flex;
      align-items: center;
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

    .form-wrapper {
      max-width: 600px;
      margin: 0 auto;
      background: #1a1a1a;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 10px 25px rgba(0, 224, 255, 0.1);
      border-left: 3px solid #00e0ff;
      transition: all 0.3s ease;
    }
    .form-wrapper:hover {
      border-left-color: #ff00ff;
      box-shadow: 0 10px 30px rgba(255, 0, 255, 0.2);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }
    input, textarea {
      width: 100%;
      padding: 12px 15px;
      background: #222;
      border: 1px solid #333;
      border-radius: 6px;
      color: #fff;
      font-size: 1rem;
      outline: none;
      transition: all 0.3s;
    }
    input:focus, textarea:focus {
      border-color: #00e0ff;
      box-shadow: 0 0 8px rgba(0, 224, 255, 0.3);
    }

    .btn-submit {
      background: linear-gradient(90deg, #00e0ff, #ff00ff);
      border: none;
      padding: 12px 25px;
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
    }
    .btn-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 0, 255, 0.4);
    }

    .success-msg {
      margin-top: 1rem;
      color: #00ff9d;
      font-weight: 600;
      text-align: center;
    }
    .error-msg {
      margin-top: 1rem;
      color: #ff4d6d;
      font-weight: 600;
      text-align: center;
    }

    @media (max-width: 768px) {
      .section-title { font-size: 2.2rem; }
      .form-wrapper { padding: 1.5rem; }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  loading = false;
  successMessage = '';
  errorMessage = '';

  async onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    try {
      const response = await fetch("https://formspree.io/f/myzddpaa", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"   // 🔑 Important for Formspree
        },
        body: JSON.stringify(this.formData)
      });

      if (response.ok) {
        this.successMessage = "✅ Thank you! Your message has been sent.";
        form.resetForm();
      } else {
        this.errorMessage = "❌ Oops! Something went wrong.";
      }
    } catch (error) {
      this.errorMessage = "⚠️ Network error. Please try again.";
    } finally {
      this.loading = false;
    }
  }
}
