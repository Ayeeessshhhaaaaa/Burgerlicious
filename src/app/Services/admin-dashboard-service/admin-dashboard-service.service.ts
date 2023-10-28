import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardServiceService {
  constructor(private _http:HttpClient) { }

  getUsersCount():Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/dashboard/usersCount';
    return this._http.get(apiUrl);
  }

  getOrdersCount():Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/dashboard/ordersCount';
    return this._http.get(apiUrl);
  }

  getFeedBackCount():Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/dashboard/feedbackCount';
    return this._http.get(apiUrl);
  }

  getIngredientCount():Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/dashboard/ingredientCount';
    return this._http.get(apiUrl);
  }

  getRatingChartInfo():Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/dashboard/getRatingChartInfo';
    return this._http.get(apiUrl);
  }

  getRevenuePerYearInfo():Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/dashboard/getRevenuePerYear';
    return this._http.get(apiUrl);
  }

  getStatusCount(status:String):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/dashboard/getStatusCountByStatus/'+status;
    return this._http.get(apiUrl);
  }

  getStatusExceptCompletedCount():Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/dashboard/getStatusExceptCompletedCount';
    return this._http.get(apiUrl);
  }
  
}
