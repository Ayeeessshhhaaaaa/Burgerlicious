import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { SnackbarComponent } from 'src/app/Components/snackbar/snackbar.component';
import { AuthServiceService } from 'src/app/Services/authService/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  imageUrl: string = 'assets/login.png';
  sanitizedImageUrl: SafeUrl;
  formData: any = {};

  constructor(
    private sanitizer: DomSanitizer,
    private SnackBar: MatSnackBar,
    private authService: AuthServiceService,
    private route: Router
  ) {
    this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }

  login(form: NgForm) {
    if (form.valid) {
      const { Username, Password } = this.formData;

      const isAdmin = Username === 'admin' && Password === '12345';

      if (isAdmin) {
        // Handle successful admin login
        localStorage.setItem('Username', 'admin');
        console.log('Admin Login Successful');
        this.route.navigate(['/admin']); // Change the route for admin dashboard
      } else {
        // Proceed with regular user login
        this.authService.login(Username, Password).subscribe(
          (response) => {
            localStorage.setItem('Username', Username);
            localStorage.setItem('UserID', response.UserID);
            console.log('User Login Successful:', response);
            this.route.navigate(['/product-page']);
            // this.route.navigate(['/user-page/' + response.UserID]);
          },
          (error) => {
            // Handle login error
            console.error('Login Error:', error);
            this.openSnackBar('Invalid credentials');
          }
        );
      }
    }
  }

  openSnackBar(message: string) {
    this.SnackBar.openFromComponent(SnackbarComponent, {
      data: { message },
      duration: 3000,
    });
  }

  signUp() {
    this.route.navigate(['/signup']);
  }
}
