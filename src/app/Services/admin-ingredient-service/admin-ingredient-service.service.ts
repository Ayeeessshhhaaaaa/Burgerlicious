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

  uploadIngredientImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    let apiUrl = 'http://localhost:3600/admin/ingredients/addIngredientImage';
    return this._http.post(apiUrl, formData);
  }

  createIngredient(data: any): Observable<any> {
    let apiUrl = 'http://localhost:3600/admin/ingredients/addIngredient';
    return this._http.post(apiUrl, data);
  }

  getIngredientById(id:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/ingredients/'+id;
    return this._http.get(apiUrl);
  }

  updateIngredientWithoutImage(id:any, data:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/ingredients/updateIngredientWithoutImage/'+id;
    return this._http.put(apiUrl,data);
  }

  updateIngredient(id:any, data:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/ingredients/updateIngredient/'+id;
    return this._http.put(apiUrl,data);
  }


  getAllCategories():Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/ingredients/getAllCategories';
    return this._http.get(apiUrl);
  }
  
  getIngredientForViewById(ingredientID:any):Observable<any>{
    let apiUrl = 'http://localhost:3600/admin/ingredients/getIngredientForViewById/'+ingredientID;
    return this._http.get(apiUrl);
  }

}
