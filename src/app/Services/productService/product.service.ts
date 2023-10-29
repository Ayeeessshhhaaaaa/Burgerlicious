import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModelServer, ServerResponse } from 'src/app/Models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL =  'http://localhost:3600/api';
  constructor(private http: HttpClient) { }

  //this is to fetch all products from the backend server
  getAllProducts(numberOfResults  = 10) : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products', {
      params: {
        limit: numberOfResults.toString()
      }
    });
  }


  //get single product from server
  getSingleProducts(id: number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/' + id);
  }

  //get product from one category
  getProductFromCategory(catName : string) : Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/products/category/' + catName);
  }

}
