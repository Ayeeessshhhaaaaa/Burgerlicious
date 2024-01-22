import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CartModelServer } from 'src/app/Models/cart.model';
import { CartService } from 'src/app/Services/cartService/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData!: CartModelServer;
  cartTotal: number = 0;
  subTotal!: number;

  constructor(public cartService: CartService, private router: Router) {
  }

  ngOnInit() {
     this.cartService.cartData$.subscribe((data: CartModelServer) => {
      this.cartData = data;
      this.cartTotal = 0;

      for (let i=0;i<this.cartData.data.length;i++){
        this.cartTotal += this.cartService.CalculateSubTotal(i);
      }
    });
    //  this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  ChangeQuantity(index: number, increase: boolean) {
    this.cartService.UpdateCartItems(index, increase);
  }

  // DeleteProductFromCart(index: number) {
  //   this.cartService.DeleteProductFromCart(index);
  //   location.reload();
  // }

  placeOrder(){

    let data ={
      UserID : localStorage.getItem('UserID'),
      TotalAmount : this.cartTotal
    };

    console.log(this.cartData.data);

    this.cartService.createOrder(data).subscribe((res) => {

      let lastInsertID = res.data.insertId;
      let OrderItems:any=[];

      for (let i=0;i<this.cartData.data.length;i++){
        let OrderItemRow = {
          Subtotal : this.cartService.CalculateSubTotal(i),
          Quantity : this.cartData.data[i].numInCart,
          ProductID : this.cartData.data[i].product.ProductID
        };
        OrderItems.push(OrderItemRow);
      }


      this.cartService.createOrderItems(OrderItems, lastInsertID).subscribe((res2) => {
        this.router.navigate(['order-successfully/'+lastInsertID]);
      });


    });

  }

}