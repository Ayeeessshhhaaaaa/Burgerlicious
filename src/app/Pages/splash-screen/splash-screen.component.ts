import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  imageUrl: string = 'assets/splash-image.png';
  sanitizedImageUrl: SafeUrl;

  constructor(private sanitizer: DomSanitizer, private router: Router) {
    this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }

  ngOnInit(): void {
   
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2500);
    }
}

