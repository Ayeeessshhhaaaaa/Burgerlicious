import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminIngredientServiceService } from 'src/app/Services/admin-ingredient-service/admin-ingredient-service.service';

@Component({
  selector: 'app-admin-ingredients-view',
  templateUrl: './admin-ingredients-view.component.html',
  styleUrls: ['./admin-ingredients-view.component.scss']
})
export class AdminIngredientsViewComponent {

  adminUser:any;

  ingredientId:any;
  ingredientDetails:any;

  error:any;
  loaderFixScriptElement: HTMLScriptElement;

  constructor(private service: AdminIngredientServiceService, private route: ActivatedRoute, private router:Router) { 
    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  ngOnInit(): void {
    this.ingredientId = this.route.snapshot.paramMap.get('id');

    this.adminUser = localStorage.getItem('Username')==="admin";

    this.service.getIngredientForViewById(this.ingredientId).subscribe((res)=>{
      this.ingredientDetails=res.data;
      //console.log(this.orderDetails);
    });
  }

  logoutAdmin(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
