import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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

  saveImageToAssets(blob: Blob) {
    const formData = new FormData();
    formData.append('image', blob, 'capturedImage.png');

    // Make an HTTP request to save the image on the server (or save locally)
    // Replace '/api/saveImage' with your server endpoint or use a file system path to save locally
    return this.http.post(`${this.apiUrl}/ordercustomizations/save-image`, formData);
  }
}
