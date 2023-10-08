import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl =  'http://localhost:3600/api';

  constructor(private http: HttpClient) { }

  sendDataToDatabase(data: any) {
    return this.http.post(`${this.apiUrl}/orders`, data);
  }
}
