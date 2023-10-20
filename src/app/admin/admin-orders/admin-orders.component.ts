import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminOrderServiceService } from 'src/app/Services/admin-order-service/admin-order-service.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
  myScriptElement: HTMLScriptElement;
  allOrders: any;

  loaderFixScriptElement: HTMLScriptElement;

  constructor(private service: AdminOrderServiceService ,private router: Router) {
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "assets/scripts/datatable.js";
    document.body.appendChild(this.myScriptElement);

    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  ngOnInit(): void {
    this.service.getAllOrders().subscribe((res) => {
      // console.log(res.data);
      this.allOrders = res.data;
    });

  }

  delete(orderID: number) {
    if (confirm('Are you sure you want to delete this order?')) {
      console.log(orderID);
      this.service.deleteOrder(orderID).subscribe((res) => {
        if (res) {
          console.log('Order deleted successfully:', res);

          location.reload(); //Reload the page

        }
        else {
          console.error('Error deleting order');

        }
      });
    }
  }

  updateOrderStatus(orderID: number) {
    this.router.navigateByUrl("admin/orders/updateOrderStatus/"+orderID);
  }
}
