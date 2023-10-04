import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminOrderServiceService } from 'src/app/Services/admin-order-service/admin-order-service.service';

@Component({
  selector: 'app-admin-order-add',
  templateUrl: './admin-order-add.component.html',
  styleUrls: ['./admin-order-add.component.scss']
})
export class AdminOrderAddComponent {
  constructor(private service: AdminOrderServiceService, private router: Router) { }

  allProducts: any;
  productNo: any;
  price: any;
  total: any = 0;
  error: any;
  cartError: any;
  quantity: any = 1;
  finalTotal: any = 0;
  product_name: any;
  cartProductArray:any = [];



  ngOnInit(): void {
    this.service.getAllProducts().subscribe((res) => {
      // console.log(res.data);
      this.allProducts = res.data;
    });
    this.total = 0;
  }

  orderForm = new FormGroup({
    'UserID': new FormControl('', Validators.required),
    // 'customerName': new FormControl('', Validators.required),
    // 'phoneNumber': new FormControl('', Validators.required),
    // 'email': new FormControl('', Validators.required),
    // 'specialNotes': new FormControl('', Validators.required),
    'TotalAmount': new FormControl(this.finalTotal, Validators.required)

  });

  orderProductForm = new FormGroup({
    'IngredientID': new FormControl('', Validators.required),
    'IngredientName': new FormControl('', Validators.required),
    'Quantity': new FormControl('', Validators.required),
    'Subtotal': new FormControl(this.total, Validators.required)

  });

  orderSubmit() {
    if (this.orderForm.valid && this.cartProductArray.length>=1) {

      this.orderForm.value.TotalAmount = this.finalTotal; //update final total

      this.service.createOrder(this.orderForm.value).subscribe((res) => {

        console.log(this.cartProductArray,"cartProductArray");
        let lastInsertID=res.data.insertId;
        let productArray=this.cartProductArray;
        this.service.createOrderProducts(productArray,lastInsertID).subscribe((res2)=>{
          // this.router.navigate(['admin/orders']); //does not seem to load properly, hangs up at burger load logo
          window.location.href = "/admin/orders";
        });
        

      });

    }
    else if(this.cartProductArray.length<1){
      this.error = "No Products in the Order";
    }
    else {
      this.error = "Please enter values for all fields";
    }

  }

  orderProductSubmit() {
    if (this.orderProductForm.valid) {
      this.orderProductForm.value.Subtotal = this.total; //otherwise it did not seems to update the value and still showed 0 (the intial total amount assigned)
      this.cartProductArray.push(this.orderProductForm.value);

      //update final total
      this.finalTotal = 0;
      for (let i = 0; i < this.cartProductArray.length; i++) {
        this.finalTotal = (parseFloat(this.finalTotal) + parseFloat(this.cartProductArray[i].Subtotal)).toFixed(2); //to 2 decimal places
      }
    }
    else {
      this.cartError = "Please enter values for all fields";
    }

  }

  onChange() {

    this.service.getProductById(this.productNo).subscribe((res) => {
      this.quantity = 1;
      this.price = res.data[0].Price;
      this.total = res.data[0].Price;
      this.product_name = res.data[0].IngredientName;
    });


  }

  onChangeQuantity() {
    if (!isNaN(this.quantity) && this.quantity != null) {
      this.total = this.price * parseInt(this.quantity);
      this.total = this.total.toFixed(2);
    }
    else if (this.quantity == null) {
      this.total = 0;
    }

  }

  deleteItemFromCartProductsArray(index: any) {
    this.cartProductArray.splice(index, 1);
    //update final total
    this.finalTotal = 0;
    for (let i = 0; i < this.cartProductArray.length; i++) {
      this.finalTotal = (parseFloat(this.finalTotal) + parseFloat(this.cartProductArray[i].Subtotal)).toFixed(2); //to 2 decimal places
    }
  }

}
