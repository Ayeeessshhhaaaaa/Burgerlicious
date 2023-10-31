import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsServiceService {


  constructor(private _http:HttpClient) { }

  getAllProducts():Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/products';
    return this._http.get(apiUrl);
  }

  deleteProduct(id: any): Observable<any> {
    let apiUrl = 'http://localhost:3600/admin/products/deleteProduct/' + id;
    return this._http.delete(apiUrl);
  }

  uploadProductImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    let apiUrl = 'http://localhost:3600/admin/products/addProductImage';
    return this._http.post(apiUrl, formData);
  }

  createProduct(data: any): Observable<any> {
    let apiUrl = 'http://localhost:3600/admin/products/addProduct';
    return this._http.post(apiUrl, data);
  }

  getProductForViewById(productID:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/products/getProductForViewById/'+productID;
    return this._http.get(apiUrl);
  }

  getProductById(id:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/products/'+id;
    return this._http.get(apiUrl);
  }

  updateProductWithoutImage(id:any, data:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/products/updateProductWithoutImage/'+id;
    return this._http.put(apiUrl,data);
  }

  updateProduct(id:any, data:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/products/updateProduct/'+id;
    return this._http.put(apiUrl,data);
  }

  getAllCategories():Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/products/getAllCategories';
    return this._http.get(apiUrl);
  }

}
