import { Component } from '@angular/core';
import { AdminIngredientServiceService } from 'src/app/Services/admin-ingredient-service/admin-ingredient-service.service';

@Component({
  selector: 'app-admin-ingredients',
  templateUrl: './admin-ingredients.component.html',
  styleUrls: ['./admin-ingredients.component.scss']
})
export class AdminIngredientsComponent {

  allIngredients:any;
  myScriptElement: HTMLScriptElement;


  constructor(private service:AdminIngredientServiceService){ 
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "assets/scripts/datatable.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
    this.service.getAllIngredients().subscribe((res)=>{
      console.log(res.data);
      this.allIngredients=res.data;
    });

}}
