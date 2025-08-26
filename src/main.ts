import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';

// Import Components
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { CertificationComponent } from './components/certification/certification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavigationComponent,
    HeaderComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent,
    CertificationComponent
  ],
  template: `
    <div class="portfolio-app">
      <app-navigation></app-navigation>
      <main>
        <app-header></app-header>
        <app-about></app-about>
        <app-skills></app-skills>
        <app-projects></app-projects>
        <app-experience></app-experience>
        <app-education></app-education>
        <app-certification></app-certification>
        <app-contact></app-contact>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .portfolio-app {
      min-height: 100vh;
    }
    
    main {
      position: relative;
    }
  `]
})
export class App {
  constructor() {
    // Add FontAwesome CSS dynamically
    this.loadFontAwesome();
  }

  private loadFontAwesome() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideAnimationsAsync()
  ]
}).catch(err => console.error(err));