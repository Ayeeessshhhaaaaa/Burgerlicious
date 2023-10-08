import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  totalAmount: number = 0;

  cartData =[
    {
      "ProductID": 1,
      "ProductName": "Product A",
      "Description": "Description of Product A",
      "TotalAmount": 19.99
    },
    {
      "ProductID": 2,
      "ProductName": "Product B",
      "Description": "Description of Product B",
      "TotalAmount": 29.99
    },
    {
      "ProductID": 3,
      "ProductName": "Product C",
      "Description": "Description of Product C",
      "TotalAmount": 9.99
    },
    {
      "ProductID": 4,
      "ProductName": "Product D",
      "Description": "Description of Product D",
      "TotalAmount": 49.99
    }
  ];
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    console.log(this.cartData);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.cartData.reduce(
      (total, product) => total + product.TotalAmount,
      0
    );
  }
  

}
