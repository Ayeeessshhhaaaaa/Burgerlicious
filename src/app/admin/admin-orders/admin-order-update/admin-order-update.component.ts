import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminOrderServiceService } from 'src/app/Services/admin-order-service/admin-order-service.service';

@Component({
  selector: 'app-admin-order-update',
  templateUrl: './admin-order-update.component.html',
  styleUrls: ['./admin-order-update.component.scss']
})
export class AdminOrderUpdateComponent {
  orderId:any;
  orderDetails:any;
  allOrderItems:any;
  allUsers:any;

  updateOrder = new FormGroup({
    'OrderID': new FormControl('', Validators.required),
    'TotalAmount': new FormControl('', Validators.required),
    'UserID': new FormControl('', Validators.required),

  });

  error:any;
  loaderFixScriptElement: HTMLScriptElement;

  constructor(private service: AdminOrderServiceService, private route: ActivatedRoute, private router:Router) { 
    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');

    this.service.getAllUsers().subscribe((res) => {
      // console.log(res.data);
      this.allUsers = res.data;
      console.log(res);
    });

    this.service.getOrderById(this.orderId).subscribe((res)=>{
      this.orderDetails=res.data;
      console.log(this.orderDetails);
      // console.log(this.orderDetails[0].UserID);
    });

    this.service.getAllOrderItemsByOrderID(this.orderId).subscribe((res)=>{
      this.allOrderItems=res.data;
    });
  
    console.log("Hey");

  }

  updateOrderSubmit() {
    if (this.updateOrder.valid) {

      this.service.updateOrderById(this.updateOrder.value,this.orderId).subscribe((res)=>{  
        this.router.navigate(['admin/orders']); //once updated, go back to view all orders page
      });
    
    }
    else {
      this.error = "Please enter values for all fields";
    }
  }

  updateOrderItem(orderItemID: number) {
    this.router.navigateByUrl("admin/orders/updateOrderItem/"+orderItemID);
  }
}
