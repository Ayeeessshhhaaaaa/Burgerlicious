import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminProductsServiceService } from 'src/app/Services/admin-products-service/admin-products-service.service';

@Component({
  selector: 'app-admin-products-add',
  templateUrl: './admin-products-add.component.html',
  styleUrls: ['./admin-products-add.component.scss']
})
export class AdminProductsAddComponent {

  adminUser:any;

  error: any;
  selectedImage: any;
  customeFileScriptElement: HTMLScriptElement;
  loaderFixScriptElement: HTMLScriptElement;
  allCategories : any;

  productForm: FormGroup = new FormGroup({
    ProductName: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    ImageURL: new FormControl('', Validators.required),
    Rating: new FormControl('', Validators.required),
    CategoryID: new FormControl('', Validators.required),
  });

  constructor(
    private service: AdminProductsServiceService,
    private router: Router
  ) {
    this.customeFileScriptElement= document.createElement("script");
    this.customeFileScriptElement.src = "assets/scripts/customeFile.js";
    document.body.appendChild(this.customeFileScriptElement);

    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  ngOnInit(): void {

    this.adminUser = localStorage.getItem('Username')==="admin";

    this.service.getAllCategories().subscribe((res) => {
      this.allCategories = res.data;
    });
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
  }


  productSubmit() {
    if (this.productForm.valid) {
      this.service
        .uploadProductImage(this.selectedImage)
        .subscribe((res) => {
          console.log(res.data);
          this.productForm.value.ImageURL=res.data;
          console.log(this.productForm.value);
          this.service
            .createProduct(this.productForm.value)
            .subscribe((res) => {
              window.location.href = '/admin/products';
          });
        });
    } else {
      this.error = 'Please enter values for all fields';
    }
  }

  logoutAdmin(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
