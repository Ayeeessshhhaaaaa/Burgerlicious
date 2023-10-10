import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminIngredientServiceService {

  constructor(private _http:HttpClient) { }

  getAllIngredients():Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/ingredients';
    return this._http.get(apiUrl);
  }

  deleteIngredient(id: any): Observable<any> {
    let apiUrl = 'http://localhost:3600/admin/ingredients/deleteIngredient/' + id;
    return this._http.delete(apiUrl);
  }
}
