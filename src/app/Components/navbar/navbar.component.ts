import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; // Import the ActivatedRoute service

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  userID : string | null | undefined;
  currentRoute: string|undefined;
  isCustomizePage: boolean = false;

  constructor(private router: ActivatedRoute, private route: Router){
   this.userID = localStorage.getItem('userID');
   this.route.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.isCustomizePage = event.url.includes('/customize-screen');
    }
  });
  
  }

  ngOnInit() {
    // Get the current route's URL
  }

  onClick(Path: string)
  {
    this.route.navigate([Path])
  }

}
