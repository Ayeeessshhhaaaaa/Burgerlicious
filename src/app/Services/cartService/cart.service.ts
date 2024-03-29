import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartModelPublic, CartModelServer } from 'src/app/Models/cart.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ProductModelServer } from 'src/app/Models/product.model';
import { ProductService } from '../productService/product.service';
import { OrderService } from '../orderService/order.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private SERVER_URL =  'http://localhost:3600/api';
  
  Total:any=0;
  TotalAdd:any=0;

  private cartDataClient: CartModelPublic = {
    prodData: [],
    total: 0
  };

  private cartDataServer: CartModelServer = {
    data: [],
    total: 0
  };

  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {
  }

  AddProductToCart(id: number, quantity?: number) {
    this.productService.getSingleProducts(id).subscribe((prod) => {
      console.log(this.cartDataServer);

        let index = this.cartDataServer.data.findIndex(p => p.product.ProductID === (prod.ProductID));
        if (index !== -1) {

          this.cartDataServer.data[index].numInCart++;
          console.log(this.cartDataClient);
          this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
          this.CalculateTotal();
          this.cartDataClient.total = this.cartDataServer.total;
          sessionStorage.setItem('cart', JSON.stringify(this.cartDataClient)); // Use sessionStorage
          this.toast.info(`${prod.ProductName} quantity updated in the cart.`, "Product Updated", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        } else {
          this.cartDataServer.data.push({
            product: prod,
            numInCart: 1
          });
          this.cartDataClient.prodData.push({
            incart: 1,
            id: prod.ProductID
          });
          this.toast.success(`${prod.ProductName} added to the cart.`, "Product Added", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
        
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        sessionStorage.setItem('cart', JSON.stringify(this.cartDataClient)); // Use sessionStorage
        this.cartData$.next({ ...this.cartDataServer });
      // }
    });
  }

  UpdateCartItems(index: number, increase: boolean) {
    let data = this.cartDataServer.data[index];
    if (increase) {
      data.numInCart++;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      sessionStorage.setItem('cart', JSON.stringify(this.cartDataClient)); // Use sessionStorage
      this.cartData$.next({ ...this.cartDataServer });
    } else {
      data.numInCart--;
      if (data.numInCart < 1) {
        this.DeleteProductFromCart(index);
      } else {
        this.cartData$.next({ ...this.cartDataServer });
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        sessionStorage.setItem('cart', JSON.stringify(this.cartDataClient)); // Use sessionStorage
      }
    }
  }

  DeleteProductFromCart(index: number) {
    if (window.confirm('Are you sure you want to remove the item?')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = { total: 0, prodData: [] };
        sessionStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        sessionStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = { total: 0, data: [{ numInCart: 0, product: {} as ProductModelServer }] };
        this.cartData$.next({ ...this.cartDataServer });
      } else {
        this.cartData$.next({ ...this.cartDataServer });
      }
    } else {
      return;
    }
  }

  private CalculateTotal() {

    this.Total = 0;

    this.cartDataServer.data.forEach(p => {
      const { numInCart } = p;
      const { Price } = p.product;

      if (!isNaN(numInCart) && !isNaN(Price)) {
        this.Total = (parseFloat((numInCart).toString()) * parseFloat((Price).toString()));
        this.TotalAdd += (parseFloat(this.Total));
      }

      // this.TotalAdd += Price * numInCart;

    });

    this.cartDataServer.total = this.TotalAdd.toFixed(2);
    this.cartTotal$.next(this.cartDataServer.total);
  }

  CheckoutFromCart(userId: number) {
    this.http.post<{ success: boolean }>(`${this.SERVER_URL}/orders/payment`, null).subscribe((res) => {
      if (res.success) {
        this.resetServerData();
        this.http.post<OrderResponse>(`${this.SERVER_URL}/orders/new`, {
          userId: userId,
          product: this.cartDataClient.prodData
        }).subscribe((data) => {
          this.orderService.getSingleOrder(data.order_id).then(prods => {
            if (data.success) {
              const navigationExtras: NavigationExtras = {
                state: {
                  message: data.message,
                  products: prods,
                  orderId: data.order_id,
                  total: this.cartDataClient.total
                }
              };
              this.spinner.hide().then();
              this.router.navigate(['/thankyou'], navigationExtras).then(p => {
                this.cartDataClient = { total: 0, prodData: []};
                this.cartTotal$.next(0);
                sessionStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              });
            }
          });
        });
      } else {
        this.spinner.hide().then();
        this.router.navigateByUrl('/checkout').then();
        this.toast.error(`Sorry, failed to book the order`, 'Order Status', {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    });
  }

  private resetServerData() {
    this.cartDataServer = {
      total: 0,
      data: []
    };
    this.cartData$.next({ ...this.cartDataServer });
  }

  CalculateSubTotal(index: number): number {
    let subTotal = 0;
    const p = this.cartDataServer.data[index];
    subTotal = p.product.Price * p.numInCart;
    return subTotal;

  }

  createOrder(data: any): Observable<any> {
    let apiUrl = 'http://localhost:3600/admin/orders/addOrder';
    console.log(data, 'create order')
    return this.http.post(apiUrl, data);
  }

  createOrderItems(data: any, orderId: any): Observable<any> {
    let apiUrl = 'http://localhost:3600/admin/orders/addOrderItems';
    //we need to pass the last inserted order Id to insert for the orderItems table
    let finalData = {
      orderId: orderId,
      data: data

    }
    console.log(finalData, 'create order products')
    return this.http.post(apiUrl, finalData);
  }


}

interface OrderResponse {
  order_id: number;
  success: boolean;
  message: string;
  products: [{
    id: string;
    numInCart: string;
  }];



}
