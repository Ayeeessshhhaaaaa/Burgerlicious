import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productModel } from 'src/app/Models/productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {


  private apiUrl = 'http://localhost:3600/api/products';

  constructor(private http: HttpClient) {}

  getProduct(): Observable<productModel[]> {
    return this.http.get<productModel[]>(`${this.apiUrl}`);
  }

  getSingleProducts(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}` + '/' + id);
  }


}
