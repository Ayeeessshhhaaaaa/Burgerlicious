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
      "ProductName": "Cheese Burger ",
      "Description": "Description of Cheese Burger",
      "TotalAmount": 19.99
    },
    {
      "ProductID": 2,
      "ProductName": "veggi Burger",
      "Description": "Description of veggi Burger",
      "TotalAmount": 29.99
    },
    {
      "ProductID": 3,
      "ProductName": "chicken Burger",
      "Description": "Description of chicken Burger",
      "TotalAmount": 9.99
    },
    {
      "ProductID": 4,
      "ProductName": "beef Burger",
      "Description": "Description of beef Burger",
      "TotalAmount": 49.99
    },
    {
      "ProductID": 4,
      "ProductName": "vegan Burger",
      "Description": "Description of vegan Burger",
      "TotalAmount": 49.99
    },
    {
      "ProductID": 5,
      "ProductName": "mushroom Burger",
      "Description": "Description of mushroom Burger",
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
