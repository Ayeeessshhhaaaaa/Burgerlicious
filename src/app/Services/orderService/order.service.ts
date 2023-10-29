import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products: ProductResponseModel[] = [];
  private SERVER_URL =  'http://localhost:3600/api';

  constructor(private http: HttpClient) {}

  getSingleOrder(orderId: number) {
    return this.http.get<ProductResponseModel[]>(this.SERVER_URL + '/orders' + orderId).toPromise();
  }

}

interface ProductResponseModel {
  ProductID: number;
  ProductName: string;
  Price: number;
  Description: string;
  ImageURL: string;
  Rating: number;
  CategoryID: number;
}
