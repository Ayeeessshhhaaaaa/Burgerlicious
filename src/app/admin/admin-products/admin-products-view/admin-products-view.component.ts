import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProductsServiceService } from 'src/app/Services/admin-products-service/admin-products-service.service';

@Component({
  selector: 'app-admin-products-view',
  templateUrl: './admin-products-view.component.html',
  styleUrls: ['./admin-products-view.component.scss']
})
export class AdminProductsViewComponent {

  adminUser:any;

  productId:any;
  productDetails:any;

  error:any;
  loaderFixScriptElement: HTMLScriptElement;

  constructor(private service: AdminProductsServiceService, private route: ActivatedRoute, private router:Router) { 
    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  ngOnInit(): void {

    this.adminUser = localStorage.getItem('Username')==="admin";

    this.productId = this.route.snapshot.paramMap.get('id');

    this.service.getProductForViewById(this.productId).subscribe((res)=>{
      this.productDetails=res.data;
      //console.log(this.orderDetails);
    });
  }

  logoutAdmin(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
