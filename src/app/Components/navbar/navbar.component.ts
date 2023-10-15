import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from 'typescript';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackSearchComponent } from '../feedback-search/feedback-search.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  userID : string | null | undefined;

  constructor(private router: Router){
    this.userID = localStorage.getItem('userID');
  }


  onClick(Path: string)
  {
    this.router.navigate([Path])
  }

}
