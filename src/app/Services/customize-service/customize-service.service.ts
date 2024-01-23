import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


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

  sendCustomize(customizeData: any) {
    return this.http.post(`${this.apiUrl}/ordercustomizations`, customizeData);
  }


  /*
  saveImageToAssets(blob: Blob) {
    const formData = new FormData();
    formData.append('image', blob, 'capturedImage.png');
    // Make an HTTP request to save the image on the server (or save locally)
    // Replace '/api/saveImage' with your server endpoint or use a file system path to save locally
    return this.http.post(`${this.apiUrl}/ordercustomizations/save-image`, formData);
  }
  */




  uploadIngredientImage(burgerName: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`${this.apiUrl}/ordercustomizations/save-image`, formData);
  }


  getImageAsBase64(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'arraybuffer' })
      .pipe(map(buffer => this.arrayBufferToBase64(buffer)));
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  


}
