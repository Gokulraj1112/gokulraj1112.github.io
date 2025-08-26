import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/users'; // Spring Boot backend URL

  constructor(private http: HttpClient) {}

  // Get all users
  async getUsers(): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>(this.apiUrl));
  }

  // Create a new user/message
  async addUser(user: User): Promise<User> {
    return firstValueFrom(this.http.post<User>(this.apiUrl, user));
  }

  // Update user/message
  async updateUser(id: number, user: User): Promise<User> {
    return firstValueFrom(this.http.put<User>(`${this.apiUrl}/${id}`, user));
  }

  // Delete user/message
async deleteUser(id: number): Promise<void> {
  await firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
}

}
