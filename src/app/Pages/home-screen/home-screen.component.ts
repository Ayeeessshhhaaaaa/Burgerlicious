import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent { 
imageUrl: string = 'assets/homescreen-image.png';
sanitizedImageUrl: SafeUrl;
constructor(private sanitizer: DomSanitizer, private router: Router) {
this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
//sessionStorage.setItem('Token', response.token);
sessionStorage.setItem('userID', '1');
sessionStorage.setItem('userType', 'user');
sessionStorage.setItem('username', 'user1');
}
redirectToCustomize(){
  this.router.navigate(['customize-screen']);
}
}
