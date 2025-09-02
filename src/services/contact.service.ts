import { Injectable } from '@angular/core';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private storageKey = 'messages';

  // Get all messages
  getAllMessages(): ContactMessage[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Save a message
  saveMessage(msg: ContactMessage) {
    const messages = this.getAllMessages();
    messages.push(msg);
    localStorage.setItem(this.storageKey, JSON.stringify(messages));
  }

  // Export messages as JSON string
  exportMessages(): string {
    return JSON.stringify(this.getAllMessages(), null, 2);
  }

  // Clear all messages
  clearMessages() {
    localStorage.removeItem(this.storageKey);
  }
}
