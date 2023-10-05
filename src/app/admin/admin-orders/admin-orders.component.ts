import { Component } from '@angular/core';
import { AdminOrderServiceService } from 'src/app/Services/admin-order-service/admin-order-service.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
  myScriptElement: HTMLScriptElement;
  allOrders:any;

  constructor(private service:AdminOrderServiceService) { 
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "assets/scripts/datatable.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
    this.service.getAllOrders().subscribe((res)=>{
      // console.log(res.data);
      this.allOrders=res.data;
    });

  }
}
