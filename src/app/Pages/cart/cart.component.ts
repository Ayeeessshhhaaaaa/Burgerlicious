import {Component, OnInit} from '@angular/core';
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

  constructor(public cartService: CartService) {
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

}