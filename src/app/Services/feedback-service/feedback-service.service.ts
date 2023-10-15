import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { feedbackModel } from 'src/app/Models/feedbackModel';

@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {

  private apiUrl = 'http://localhost:3600/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Example method to fetch data from the API
  getFeedback(): Observable<feedbackModel[]> {
    return this.http.get<feedbackModel[]>(`${this.apiUrl}/orderreviews`);
  }

  searchFeedback(query: string): Observable<feedbackModel[]> {
    return this.http.get<feedbackModel[]>(`${this.apiUrl}/orderreviews/search?query=${query}`)
  }

  getFeedbackDetails(ReviewID:number|undefined): Observable<any> {
    return this.http.get<any> (`${this.apiUrl}/orderreviews/${ReviewID}`);
  }
  sendFeedback(feedbackData: any) {
    return this.http.post(`${this.apiUrl}/orderreviews`, feedbackData);
  }
  deleteFeedback(ReviewID: number): Observable<any> {
    const url = `${this.apiUrl}/orderreviews/${ReviewID}`;
    return this.http.delete(url);
  }
  updateFeedback(feedbackData: any)
  {
    return this.http.put(`${this.apiUrl}/orderreviews/${feedbackData.ReviewID}`, feedbackData);
  }
}
