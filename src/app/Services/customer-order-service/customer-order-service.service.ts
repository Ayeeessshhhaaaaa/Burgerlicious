import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderServiceService {

  constructor(private _http:HttpClient) { }

  getOrderById(OrderId:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/api/orders/orderById/'+OrderId;
    return this._http.get(apiUrl);
  }

  getAllOrdersOfUser(UserID:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/api/orders/ordersByUserId/'+UserID;
    // console.log(UserID);
    return this._http.get(apiUrl);
  }




}
