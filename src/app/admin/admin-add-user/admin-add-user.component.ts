import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminUserService } from 'src/app/Services/admin-user-service/admin-user.service';


@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.scss']
})
export class AdminAddUserComponent {
  error: any;
  userForm: FormGroup = new FormGroup({
    UserID: new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', Validators.required),
  });

  loaderFixScriptElement: HTMLScriptElement;

  constructor(private userService: AdminUserService, private route: Router)
  {
    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  Submit() {
    if (this.userForm.valid) {
      // Data is valid, proceed to send it to the API service
      const formData: any = this.userForm.value; // 'formData' is of type 'any'
      // Now you can make the POST request to your API service
      this.userService.postUserData(formData).subscribe(
        (response) => {
          // Handle success response here
          console.log('Success:', response);
          this.route.navigate(['/admin-add-user']);
          // Reload the page after successful deletion
        },
        (error) => {
          // Handle error here
          console.error('Error:', error);
        }
      );
    }
  }
}
