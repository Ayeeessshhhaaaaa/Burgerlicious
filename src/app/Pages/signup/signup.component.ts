import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms'; // Import NgForm for form handling
import { SnackbarComponent } from 'src/app/Components/snackbar/snackbar.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from 'src/app/Services/authService/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  imageUrl: string = 'assets/login.png';
  sanitizedImageUrl: SafeUrl;
  formData: any = {};


  constructor(private sanitizer: DomSanitizer, private SnackBar: MatSnackBar, private route: Router, private http: HttpClient, private apiService: AuthServiceService) {
  this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.apiService.postFormData(this.formData)
      .subscribe((response) => {
        console.log('API Response:', response);
        // Reset the form after a successful submission
        form.resetForm();
        this.openSnackBar("User succesfully registered");
      });
  
    } else {
      this.openSnackBar("Form is invalid");

      console.log('Form is invalid. Please check the input fields.');
    }
  }

  openSnackBar(message: string) {
    this.SnackBar.openFromComponent(SnackbarComponent, {
      data: { message },
      duration: 3000,
      });
  }

  login(){
    this.route.navigate(['/login']);
  }

}
