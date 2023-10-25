import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CustomizeServiceService {
  private apiUrl = 'http://localhost:3600/api';

  constructor(private http: HttpClient) {}

  getIngredients() {
    return this.http.get<any[]>(`${this.apiUrl}/customize-categories`);
  }

  getItems(CategoryID: number)
  {
    return this.http.get<any[]> (`${this.apiUrl}/customize-categories/${CategoryID}`);
  }
}
