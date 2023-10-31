import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminIngredientServiceService } from 'src/app/Services/admin-ingredient-service/admin-ingredient-service.service';

@Component({
  selector: 'app-admin-ingredients',
  templateUrl: './admin-ingredients.component.html',
  styleUrls: ['./admin-ingredients.component.scss']
})
export class AdminIngredientsComponent {

  allIngredients:any;
  myScriptElement: HTMLScriptElement;

  loaderFixScriptElement: HTMLScriptElement;

  constructor(private service:AdminIngredientServiceService,private router: Router){ 
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "assets/scripts/datatable.js";
    document.body.appendChild(this.myScriptElement);

    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  ngOnInit(): void {
    this.service.getAllIngredients().subscribe((res)=>{
      console.log(res.data);
      this.allIngredients=res.data;
    });

  }

  delete(IngredientID: number) {
    if (confirm('Are you sure you want to delete this ingredient?')) {
      console.log(IngredientID);
      this.service.deleteIngredient(IngredientID).subscribe((res) => {
        if (res) {
          console.log('Ingredient deleted successfully:', res);

          location.reload(); //Reload the page

        }
        else {
          console.error('Error deleting ingredient');

        }
      });
    }
  }


  updateIngredient(IngredientID: number) {
    this.router.navigateByUrl("admin/ingredients/updateIngredient/"+IngredientID);
  }

  viewIngredient(ingredientId: number) {
    this.router.navigateByUrl("admin/ingredients/viewIngredient/"+ingredientId);
  }

}
