import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cartService/cart.service';

@Component({
  selector: 'app-product-block',
  templateUrl: './product-block.component.html',
  styleUrls: ['./product-block.component.scss']
})
export class ProductBlockComponent {

  @Input() ProductID : number | undefined;
  @Input() ProductName	: string | undefined;
  @Input() Price: number | undefined;
  @Input() Description: string | undefined;
  @Input() ImageURL: string | undefined;
  @Input() Rating: string | undefined;
  @Input() CategoryID: number | undefined;


  constructor(private sanitizer: DomSanitizer, private router:Router, private cartService: CartService){
  }


  redirectToProductPage()
  {
    if (this.ProductID)
    {
      this.router.navigate(['/product-details',this.ProductID]);
    } 
  }


  AddToCart(id: any){
    this.cartService.AddProductToCart(id);
  }



}
