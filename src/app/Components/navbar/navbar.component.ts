import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from 'typescript';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router){}
  onClick(Path: string)
  {
    this.router.navigate([Path])
  }
}
