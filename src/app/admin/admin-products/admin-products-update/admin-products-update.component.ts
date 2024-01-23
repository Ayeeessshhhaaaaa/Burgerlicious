import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProductsServiceService } from 'src/app/Services/admin-products-service/admin-products-service.service';

@Component({
  selector: 'app-admin-products-update',
  templateUrl: './admin-products-update.component.html',
  styleUrls: ['./admin-products-update.component.scss']
})
export class AdminProductsUpdateComponent {

  adminUser:any;

  error: any;
  selectedImage: any;
  customeFileScriptElement: HTMLScriptElement;
  loaderFixScriptElement: HTMLScriptElement;
  productID: any;
  productDetails: any;
  allCategories : any;

  productForm: FormGroup = new FormGroup({
    ProductName: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    ImageURL: new FormControl(''),
    Rating: new FormControl('', Validators.required),
    CategoryID: new FormControl('', Validators.required),
  });

  constructor(
    private service: AdminProductsServiceService,
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

    this.adminUser = localStorage.getItem('Username')==="admin";

    this.productID = this.route.snapshot.paramMap.get('id');

    this.service.getProductById(this.productID).subscribe((res)=>{
      this.productDetails=res.data;
      console.log(this.productDetails);
    });


    this.service.getAllCategories().subscribe((res) => {
      this.allCategories = res.data;
    });


  }

  

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
  }


  productSubmit() {
    // console.log(this.selectedImage);
    if(this.selectedImage==undefined && this.productForm.valid){
      this.service
        .updateProductWithoutImage(this.productID,this.productForm.value)
        .subscribe((res) => {
          window.location.href = '/admin/products';
        });
    }
    else if(this.productForm.valid && this.selectedImage!=undefined) {
      this.service
        .uploadProductImage(this.selectedImage)
        .subscribe((res) => {
          console.log(res.data);
          this.productForm.value.ImageURL=res.data;
          console.log(this.productForm.value);
          this.service
            .updateProduct(this.productID, this.productForm.value)
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
