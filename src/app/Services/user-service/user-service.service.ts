import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private _http:HttpClient) { }

  getUsersById(userID:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/api/getUsersById/'+userID;
    return this._http.get(apiUrl);
  }

  updateOrderById(updateUser:any,userID:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/api/updateUserById/'+userID;
    return this._http.put(apiUrl,updateUser);
  }


}
