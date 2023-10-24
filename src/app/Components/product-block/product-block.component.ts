import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

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


  constructor(private sanitizer: DomSanitizer, private router:Router){
  }


  redirectToProductPage()
  {
    if (this.ProductID)
    {
      this.router.navigate(['/product-details',this.ProductID]);
    } 
  }



}
