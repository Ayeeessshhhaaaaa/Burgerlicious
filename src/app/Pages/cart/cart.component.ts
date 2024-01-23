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
  customizeData: any[] = [];

  constructor(public cartService: CartService, private router: Router) {
  }

  ngOnInit() {

    const burgerData = localStorage.getItem('cartItems');
    if(burgerData){
      this.customizeData = JSON.parse(burgerData);
      console.log('customizeData from local storage', this.customizeData);
    }
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

  DeleteProductFromCart(customizeId: string) {
    // Remove the object from customizeData with the matching customizeId
    this.customizeData = this.customizeData.filter(item => item.customizeId !== customizeId);
  
    // Save the updated customizeData to local storage
    localStorage.setItem('cartItems', JSON.stringify(this.customizeData));
  
    // Permanently remove the item from local storage
    localStorage.removeItem('cartItems' + customizeId);
  
    location.reload();
  }

  getTotalPrice(): number {
    return this.customizeData.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  
  

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