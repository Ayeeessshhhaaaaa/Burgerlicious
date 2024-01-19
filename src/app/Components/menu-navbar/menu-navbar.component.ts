import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu-navbar',
  templateUrl: './menu-navbar.component.html',
  styleUrls: ['./menu-navbar.component.scss']
})
export class MenuNavbarComponent {
  isNavOpen = false;

  constructor(private route: Router,){
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  onClick(Path: string)
  {
    this.route.navigate([Path])
  }
}
