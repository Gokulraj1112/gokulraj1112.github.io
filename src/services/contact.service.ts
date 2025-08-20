import { Injectable } from '@angular/core';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'sent' | 'failed';
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly DEVELOPER_EMAIL = 'gokulrajsettu.developer@gmail.com';
  private readonly STORAGE_KEY = 'portfolio_messages';

  constructor() {}

  async saveMessage(messageData: Omit<ContactMessage, 'id' | 'timestamp' | 'status'>): Promise<ContactMessage> {
    const message: ContactMessage = {
      ...messageData,
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Save to localStorage
    const messages = this.getStoredMessages();
    messages.push(message);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));

    // Attempt to send email
    try {
      await this.sendEmail(message);
      message.status = 'sent';
    } catch (error) {
      console.error('Failed to send email:', error);
      message.status = 'failed';
    }

    // Update stored message with status
    this.updateMessageStatus(message.id, message.status);

    return message;
  }

  private async sendEmail(message: ContactMessage): Promise<void> {
    // Method 1: Open default email client
    const subject = encodeURIComponent(`Portfolio Contact: ${message.subject}`);
    const body = encodeURIComponent(
      `New message from your portfolio website:\n\n` +
      `Name: ${message.name}\n` +
      `Email: ${message.email}\n` +
      `Subject: ${message.subject}\n\n` +
      `Message:\n${message.message}\n\n` +
      `Sent at: ${new Date(message.timestamp).toLocaleString()}`
    );
    
    const mailtoLink = `mailto:${this.DEVELOPER_EMAIL}?subject=${subject}&body=${body}`;
    
    // For better user experience, we'll use a combination of methods
    try {
      // Try to open email client
      window.location.href = mailtoLink;
      
      // Also try to send via EmailJS if configured (optional)
      // await this.sendViaEmailJS(message);
      
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }

  // Optional: EmailJS integration (requires EmailJS account setup)
  private async sendViaEmailJS(message: ContactMessage): Promise<void> {
    // This would require EmailJS setup and API keys
    // For now, we'll use the mailto approach
    console.log('EmailJS integration can be added here');
  }

  getStoredMessages(): ContactMessage[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading stored messages:', error);
      return [];
    }
  }

  updateMessageStatus(messageId: string, status: ContactMessage['status']): void {
    const messages = this.getStoredMessages();
    const messageIndex = messages.findIndex(m => m.id === messageId);
    
    if (messageIndex !== -1) {
      messages[messageIndex].status = status;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));
    }
  }

  getAllMessages(): ContactMessage[] {
    return this.getStoredMessages().sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  deleteMessage(messageId: string): void {
    const messages = this.getStoredMessages().filter(m => m.id !== messageId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Method to export messages as JSON (for backup/admin purposes)
  exportMessages(): string {
    return JSON.stringify(this.getAllMessages(), null, 2);
  }

  // Method to clear all messages
  clearAllMessages(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}