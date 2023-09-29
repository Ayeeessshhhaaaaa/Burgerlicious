import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { feedbackModel } from 'src/app/Models/feedbackModel';

@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {

  private apiUrl = 'http://localhost:3000/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Example method to fetch data from the API
  getFeedback(): Observable<feedbackModel[]> {
    return this.http.get<feedbackModel[]>(`${this.apiUrl}/orderreviews`);
  }
  getFeedbackDetails(ReviewID:number|undefined): Observable<any> {
    return this.http.get<any> (`${this.apiUrl}/orderreviews/${ReviewID}`);
  }
  sendFeedback(feedbackData: any) {
    return this.http.post(`${this.apiUrl}/orderreviews`, feedbackData);
  }
}
