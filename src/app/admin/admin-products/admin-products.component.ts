import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProductsServiceService } from 'src/app/Services/admin-products-service/admin-products-service.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {


  allProducts:any;
  myScriptElement: HTMLScriptElement;

  loaderFixScriptElement: HTMLScriptElement;

  constructor(private service:AdminProductsServiceService, private router: Router){ 
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "assets/scripts/datatable.js";
    document.body.appendChild(this.myScriptElement);

    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  ngOnInit(): void {
    this.service.getAllProducts().subscribe((res)=>{
      console.log(res.data);
      this.allProducts=res.data;
    });

  }

  delete(ProductID: number) {
    if (confirm('Are you sure you want to delete this products?')) {
      console.log(ProductID);
      this.service.deleteProduct(ProductID).subscribe((res) => {
        if (res) {
          console.log('Product deleted successfully:', res);

          location.reload(); //Reload the page

        }
        else {
          console.error('Error deleting product');

        }
      });
    }
  }


  viewProduct(productId: number) {
    this.router.navigateByUrl("admin/products/viewProduct/"+productId);
  }






}
