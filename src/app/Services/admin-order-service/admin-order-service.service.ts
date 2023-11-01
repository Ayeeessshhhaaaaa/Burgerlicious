import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderServiceService {

  constructor(private _http: HttpClient) { }

  getAllOrders(): Observable<any> {
    let apiUrl = 'http://localhost:3600/admin/orders';
    return this._http.get(apiUrl);
  }

  createOrder(data: any): Observable<any> {
    let apiUrl = 'http://localhost:3600/admin/orders/addOrder';
    console.log(data, 'create order')
    return this._http.post(apiUrl, data);
  }

  getAllProducts(): Observable<any> {
    let apiUrl = 'http://localhost:3600/admin/orders/products';
    return this._http.get(apiUrl);
  }

  getProductById(id: any): Observable<any> {
    let apiUrl = 'http://localhost:3600/admin/orders/products/' + id;
    return this._http.get(apiUrl);
  }

  createOrderItems(data: any, orderId: any): Observable<any> {
    let apiUrl = 'http://localhost:3600/admin/orders/addOrderItems';
    //we need to pass the last inserted order Id to insert for the orderItems table
    let finalData = {
      orderId: orderId,
      data: data

    }
    console.log(finalData, 'create order products')
    return this._http.post(apiUrl, finalData);
  }

  deleteOrder(id: any): Observable<any> {
    let apiUrl = 'http://localhost:3600/admin/orders/deleteOrder/' + id;
    return this._http.delete(apiUrl);
  }
  
  getOrderById(id:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/orders/'+id;
    return this._http.get(apiUrl);
  }

  updateOrderStatusById(data:any,orderId:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/orders/updateOrderStatusById/'+orderId;
    return this._http.put(apiUrl,data);
  }

  getOrderForViewById(orderItemID:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/orders/getOrderForViewById/'+orderItemID;
    return this._http.get(apiUrl);
  }

  getAllOrderItemsByOrderID(orderId:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/orders/getAllOrderItemsByOrderID/'+orderId;
    return this._http.get(apiUrl);
  }

  //For update
  // getAllUsers2():Observable<any>{
  //   let apiUrl = 'http://localhost:3600/api/users';
  //   return this._http.get(apiUrl);
  // }

  getAllUsers():Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/orders/users';
    return this._http.get(apiUrl);
  }

  updateOrderById(updateOrder:any,orderID:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/orders/updateOrderById/'+orderID;
    return this._http.put(apiUrl,updateOrder);
  }

  //Order Item Update
  getOrderItemById(orderItemID:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/orders/getOrderItemById/'+orderItemID;
    return this._http.get(apiUrl);
  }

  updateOrderItemById(updateOrderItem:any,orderItemID:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/orders/updateOrderItemById/'+orderItemID;
    return this._http.put(apiUrl,updateOrderItem);
  }

  updateOrderTotalAmount(totalAmountCalculate:any,orderID:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/orders/updateOrderTotalAmount/'+orderID;
    return this._http.put(apiUrl,totalAmountCalculate);
  }
  
}
