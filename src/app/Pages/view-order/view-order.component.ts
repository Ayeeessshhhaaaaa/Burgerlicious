import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminOrderServiceService } from 'src/app/Services/admin-order-service/admin-order-service.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent {

  orderId:any;
  orderDetails:any;
  allOrderItems:any;


  constructor(private service: AdminOrderServiceService, private route: ActivatedRoute, private router:Router) { 

  }

  ngOnInit(): void {

    this.orderId = this.route.snapshot.paramMap.get('id');

    this.service.getOrderForViewById(this.orderId).subscribe((res)=>{
      this.orderDetails=res.data;
      //console.log(this.orderDetails);
    });

    this.service.getAllOrderItemsByOrderID(this.orderId).subscribe((res)=>{
      this.allOrderItems=res.data;
    });
  }


}
