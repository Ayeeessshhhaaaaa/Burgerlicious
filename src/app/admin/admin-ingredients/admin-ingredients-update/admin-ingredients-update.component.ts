import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminIngredientServiceService } from 'src/app/Services/admin-ingredient-service/admin-ingredient-service.service';

@Component({
  selector: 'app-admin-ingredients-update',
  templateUrl: './admin-ingredients-update.component.html',
  styleUrls: ['./admin-ingredients-update.component.scss']
})
export class AdminIngredientsUpdateComponent {

  error: any;
  selectedImage: any;
  customeFileScriptElement: HTMLScriptElement;
  loaderFixScriptElement: HTMLScriptElement;
  ingredientID: any;
  ingredientDetails: any;

  ingredientForm: FormGroup = new FormGroup({
    IngredientName: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    ImageURL: new FormControl(''),
    CategoryID: new FormControl('', Validators.required),
  });

  constructor(
    private service: AdminIngredientServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customeFileScriptElement= document.createElement("script");
    this.customeFileScriptElement.src = "assets/scripts/customeFile.js";
    document.body.appendChild(this.customeFileScriptElement);

    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  ngOnInit(): void {
    this.ingredientID = this.route.snapshot.paramMap.get('id');

    this.service.getIngredientById(this.ingredientID).subscribe((res)=>{
      this.ingredientDetails=res.data;
      console.log(this.ingredientDetails);
    });

  }

  

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
  }


  ingredientSubmit() {
    // console.log(this.selectedImage);
    if(this.selectedImage==undefined && this.ingredientForm.valid){
      this.service
        .updateIngredientWithoutImage(this.ingredientID,this.ingredientForm.value)
        .subscribe((res) => {
          window.location.href = '/admin/ingredients';
        });
    }
    else if(this.ingredientForm.valid && this.selectedImage!=undefined) {
      this.service
        .uploadIngredientImage(this.selectedImage)
        .subscribe((res) => {
          console.log(res.data);
          this.ingredientForm.value.ImageURL=res.data;
          console.log(this.ingredientForm.value);
          this.service
            .updateIngredient(this.ingredientID, this.ingredientForm.value)
            .subscribe((res) => {
              window.location.href = '/admin/ingredients';
          });
        });


      // this.service
      //       .updateIngredient(this.ingredientID, this.ingredientForm.value)
      //       .subscribe((res) => {
      //         window.location.href = '/admin/ingredients';
      //     });
    } else {
      this.error = 'Please enter values for all fields';
    }
  }







}
