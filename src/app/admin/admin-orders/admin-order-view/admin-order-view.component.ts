import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminOrderServiceService } from 'src/app/Services/admin-order-service/admin-order-service.service';

@Component({
  selector: 'app-admin-order-view',
  templateUrl: './admin-order-view.component.html',
  styleUrls: ['./admin-order-view.component.scss']
})
export class AdminOrderViewComponent {

  adminUser:any;

  orderId:any;
  orderDetails:any;
  allOrderItems:any;

  error:any;
  loaderFixScriptElement: HTMLScriptElement;

  constructor(private service: AdminOrderServiceService, private route: ActivatedRoute, private router:Router) { 
    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  ngOnInit(): void {

    this.adminUser = localStorage.getItem('Username')==="admin";

    this.orderId = this.route.snapshot.paramMap.get('id');

    this.service.getOrderForViewById(this.orderId).subscribe((res)=>{
      this.orderDetails=res.data;
      //console.log(this.orderDetails);
    });

    this.service.getAllOrderItemsByOrderID(this.orderId).subscribe((res)=>{
      this.allOrderItems=res.data;
    });
  }

  logoutAdmin(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
}
