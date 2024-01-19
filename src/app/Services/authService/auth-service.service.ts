import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:3600/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  postFormData(formData: any) {
    return this.http.post(`${this.apiUrl}/signup`, formData);
  }

  login(username: string, password: string): Observable<any> {
    const body = {
      "Username" : username,
      "Password": password
      }
    return this.http.post(`${this.apiUrl}/signin`, body);
  }
}
