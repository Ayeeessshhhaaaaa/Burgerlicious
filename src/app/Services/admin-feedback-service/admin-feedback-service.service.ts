import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AdminFeedbackServiceService {

  private apiUrl = 'http://localhost:3600/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Example method to fetch data from the API
  getFeedback(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orderreviews`);
  }

  deleteFeedback(ReviewID: number): Observable<any> {
    const url = `${this.apiUrl}/orderreviews/${ReviewID}`;
    return this.http.delete(url);
  }
}
