import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms'; // Import NgForm for form handling
import { SnackbarComponent } from 'src/app/Components/snackbar/snackbar.component';
import { AuthServiceService } from 'src/app/Services/authService/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  imageUrl: string = 'assets/login.png';
  sanitizedImageUrl: SafeUrl;
  formData: any = {};


  constructor(private sanitizer: DomSanitizer, private SnackBar: MatSnackBar, private authService: AuthServiceService) {
  this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }

  login(form: NgForm) {
    if (form.valid) {
      const { Username, Password } = this.formData;
      this.authService.login(Username, Password).subscribe(
        (response) => {
          // Handle successful login response
          console.log('Login Successful:', response);
        },
        (error) => {
          // Handle login error
          console.error('Login Error:', error);
        }
      );
    }
  }
  openSnackBar(message: string) {
    this.SnackBar.openFromComponent(SnackbarComponent, {
      data: { message },
      duration: 3000,
      });
  }

}
