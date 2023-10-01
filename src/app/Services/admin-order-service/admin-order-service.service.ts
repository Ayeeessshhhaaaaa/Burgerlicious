import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderServiceService {

  constructor(private _http:HttpClient) { }

  getAllOrders():Observable<any>{
    let apiUrl = 'http://localhost:3600/orders';
    return this._http.get(apiUrl);
  }

  createOrder(data:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/addOrder';
    console.log(data,'create order')
    return this._http.post(apiUrl,data);
  }

  getAllProducts():Observable<any>{
    let apiUrl = 'http://localhost:3600/products';
    return this._http.get(apiUrl);
  }

  getProductById(id:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/products/'+id;
    return this._http.get(apiUrl);
  }

  createOrderProducts(data:any,orderId:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/addOrderProducts';
    //we need to pass the last inserted order Id to insert for the order product table
    let finalData = {
      orderId:orderId,
      data:data

    }
    console.log(finalData,'create order products')
    return this._http.post(apiUrl,finalData);
  }
}
