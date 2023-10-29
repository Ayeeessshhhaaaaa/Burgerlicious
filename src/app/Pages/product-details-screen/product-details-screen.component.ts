import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/Services/product-service/product-service.service';

@Component({
  selector: 'app-product-details-screen',
  templateUrl: './product-details-screen.component.html',
  styleUrls: ['./product-details-screen.component.scss']
})
export class ProductDetailsScreenComponent {


  productData: any;
  productId:any;

  constructor(private ProductService: ProductServiceService,private router: Router, private route: ActivatedRoute) {
  }




  ngOnInit(): void {
    // this.loader(true, 4000);
    this.productId = this.route.snapshot.paramMap.get('ProductID');
    this.ProductService.getSingleProducts(this.productId ).subscribe(
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
