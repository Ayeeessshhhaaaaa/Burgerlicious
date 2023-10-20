import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminIngredientServiceService } from 'src/app/Services/admin-ingredient-service/admin-ingredient-service.service';

@Component({
  selector: 'app-admin-ingredients-add',
  templateUrl: './admin-ingredients-add.component.html',
  styleUrls: ['./admin-ingredients-add.component.scss'],
})
export class AdminIngredientsAddComponent {
  error: any;
  selectedImage: any;
  customeFileScriptElement: HTMLScriptElement;
  loaderFixScriptElement: HTMLScriptElement;

  ingredientForm: FormGroup = new FormGroup({
    IngredientName: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    ImageURL: new FormControl('', Validators.required),
    CategoryID: new FormControl('', Validators.required),
  });

  constructor(
    private service: AdminIngredientServiceService,
    private router: Router
  ) {
    this.customeFileScriptElement= document.createElement("script");
    this.customeFileScriptElement.src = "assets/scripts/customeFile.js";
    document.body.appendChild(this.customeFileScriptElement);

    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
  }


  ingredientSubmit() {
    if (this.ingredientForm.valid) {
      this.service
        .uploadIngredientImage(this.selectedImage)
        .subscribe((res) => {
          console.log(res.data);
          this.ingredientForm.value.ImageURL=res.data;
          console.log(this.ingredientForm.value);
          this.service
            .createIngredient(this.ingredientForm.value)
            .subscribe((res) => {
              window.location.href = '/admin/ingredients';
          });
        });
    } else {
      this.error = 'Please enter values for all fields';
    }
  }
}
