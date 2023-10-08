import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  private apiUrl =  'http://localhost:3600/api';

  constructor(private http: HttpClient) { }

  getAllUsers():Observable<any>{
    return this.http.get(`${this.apiUrl}/users`);
  }

  postUserData(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, formData);
  }

  deleteUser(UserID: number): Observable<any> {
    const url = `${this.apiUrl}/users/${UserID}`;
    return this.http.delete(url);
  }

}
