import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FeedbackServiceService } from 'src/app/Services/feedback-service/feedback-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { productModel } from 'src/app/Models/productModel';
import { ProductServiceService } from 'src/app/Services/product-service/product-service.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {




  productData: productModel[] | undefined;
  imageUrl: string = 'assets/Ellipse.png';
  sanitizedImageUrl: SafeUrl;
  showLoader: boolean=false;
  isSearchExpanded: boolean = false;
  searchQuery: string = '';
  constructor(private sanitizer: DomSanitizer, private ProductService: ProductServiceService,private router: Router, public dialog: MatDialog) {
    this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }




  ngOnInit(): void {
    // this.loader(true, 4000);
    this.ProductService.getProduct().subscribe(
      (data) => {
        // Handle the API response data here
        this.productData = data;
        console.log(data);
      },
      (error) => {
        // Handle any errors here
        console.error(error);
      }
    );
  }



}
