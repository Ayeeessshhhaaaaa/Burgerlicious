import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; // Import the ActivatedRoute service
import { CartModelServer } from 'src/app/Models/cart.model';
import { CartService } from 'src/app/Services/cartService/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  userID : string | null | undefined;
  currentRoute: string|undefined;
  isCustomizePage: boolean = false;
  cartData!: CartModelServer;
  cartTotal: number = 0;
  flag:any=true;
  finalCartData!: CartModelServer;

  constructor(private router: ActivatedRoute, private route: Router, public cartService: CartService){
   this.userID = localStorage.getItem('UserID');
   this.route.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.isCustomizePage = event.url.includes('/customize-screen');
    }
  });
  
  }

  ngOnInit() {
    // Get the current route's URL
    this.cartService.cartData$.subscribe(data => {
      this.cartData = data;
      this.cartTotal = 0;

      for (let i=0;i<this.cartData.data.length;i++){
        this.cartTotal += this.cartService.CalculateSubTotal(i);
      }

    });
  }

  onClick(Path: string)
  {
    this.route.navigate([Path])
  }

  userProfile(){
    this.route.navigate(['/user-page/'+localStorage.getItem('UserID')]);
  }

  logoutUser(){
    localStorage.clear();
    this.route.navigate(['/login']);
  }

}
