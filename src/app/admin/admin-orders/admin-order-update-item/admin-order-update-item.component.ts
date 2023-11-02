import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminOrderServiceService } from 'src/app/Services/admin-order-service/admin-order-service.service';

@Component({
  selector: 'app-admin-order-update-item',
  templateUrl: './admin-order-update-item.component.html',
  styleUrls: ['./admin-order-update-item.component.scss']
})
export class AdminOrderUpdateItemComponent {
  orderItemID:any;
  orderItemDetails:any;
  oneItemPrice:any; //calculate without sending another db request
  totalAmountCalculate:any=0;

  updateOrderItem = new FormGroup({
    'OrderItemID': new FormControl('', Validators.required),
    'Subtotal': new FormControl('', Validators.required),
    'OrderID': new FormControl('', Validators.required),
    'ProductID': new FormControl('', Validators.required),
    'Quantity': new FormControl('', Validators.required),

  });

  error:any;
  loaderFixScriptElement: HTMLScriptElement;

  constructor(private service: AdminOrderServiceService, private route: ActivatedRoute, private router:Router) { 
    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  ngOnInit(): void {
    this.orderItemID = this.route.snapshot.paramMap.get('id');

    this.service.getOrderItemById(this.orderItemID).subscribe((res)=>{
      this.orderItemDetails=res.data;
      this.oneItemPrice=(this.orderItemDetails[0].Subtotal)/(this.orderItemDetails[0].Quantity)
      console.log(this.orderItemDetails);
    });


  }

  updateOrderItemSubmit() {
    if (this.updateOrderItem.valid) {

      this.service.updateOrderItemById(this.updateOrderItem.value, this.orderItemID).subscribe((res) => {
        if (res) {
          this.service.getAllOrderItemsByOrderID(this.orderItemDetails[0].OrderID).subscribe((res) => {
            if (res) {
              let allOrderItems = res.data;
              this.totalAmountCalculate = 0;
              for (let i of allOrderItems) {
                this.totalAmountCalculate += parseFloat(i.Subtotal);
              }
              console.log(this.totalAmountCalculate);
              this.service.updateOrderTotalAmount({ 'totalAmountCalculate': this.totalAmountCalculate }, this.orderItemDetails[0].OrderID).subscribe((res) => {
                this.router.navigate(['admin/orders/updateOrder/' + this.orderItemDetails[0].OrderID]); //once updated, go back to update page
              });
            }

          });
        }

      });

    }
    else {
      this.error = "Please enter values for all fields";
    }
  }

  onChangeQuantity() {
   
    if (!isNaN(this.orderItemDetails[0].Quantity) && this.orderItemDetails[0].Quantity != null && this.orderItemDetails[0].Quantity.length >0) {
      this.orderItemDetails[0].Subtotal = this.oneItemPrice * parseInt(this.orderItemDetails[0].Quantity);
      this.orderItemDetails[0].Subtotal = this.orderItemDetails[0].Subtotal.toFixed(2);
    }
    else {
      console.log(this.orderItemDetails[0].Quantity.length);
      this.orderItemDetails[0].Subtotal = 0.00;
    }

    //this.orderItemDetails[0].Quantity == null || this.orderItemDetails[0].Quantity == undefined || this.orderItemDetails[0].Quantity.length==0

  }
}
