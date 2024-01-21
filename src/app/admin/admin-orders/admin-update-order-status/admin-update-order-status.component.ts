import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminOrderServiceService } from 'src/app/Services/admin-order-service/admin-order-service.service';

@Component({
  selector: 'app-admin-update-order-status',
  templateUrl: './admin-update-order-status.component.html',
  styleUrls: ['./admin-update-order-status.component.scss']
})
export class AdminUpdateOrderStatusComponent {

  adminUser:any;

  orderId:any;
  orderDetails:any;

  status1:any=1; //always true since order should be placed to view this page (so always received)
  status2:any;
  status3:any;
  status4:any;

  updateOrderStatus = new FormGroup({
    'OrderID': new FormControl('', Validators.required),
    'Status': new FormControl('', Validators.required)

  });

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

    this.service.getOrderById(this.orderId).subscribe((res)=>{
      this.orderDetails=res.data;
      this.activateOrderStatusTimeline(); //need to have orderDetails data to do this
    });

  }

  updateOrderStatusSubmit() {
    if (this.updateOrderStatus.valid) {

      this.service.updateOrderStatusById(this.updateOrderStatus.value,this.orderId).subscribe((res)=>{  
        this.router.navigate(['admin/orders']); //once updated, go back to view all orders page
      });
    

    }
    else {
      this.error = "Please enter values for all fields";
    }
  }

  activateOrderStatusTimeline(){
    //Gradually activate depending on the order status
    if(this.orderDetails[0].Status=="Preparing Food"){
      this.status2=1;
    }
    else if(this.orderDetails[0].Status=="Order Ready"){
      this.status2=1;
      this.status3=1;
    }
    else if(this.orderDetails[0].Status=="Completed"){
      this.status2=1;
      this.status3=1;
      this.status4=1;
    }

  }

  logoutAdmin(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
