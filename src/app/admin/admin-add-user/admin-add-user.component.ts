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

    adminUser:any;

    error: any;
    userForm: FormGroup = new FormGroup({
    Name: new FormControl('', Validators.required),
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Contact: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
  });

  loaderFixScriptElement: HTMLScriptElement;

  constructor(private userService: AdminUserService, private route: Router)
  {
    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  ngOnInit(): void {
    this.adminUser = localStorage.getItem('Username')==="admin";
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

  logoutAdmin(){
    localStorage.clear();
    this.route.navigate(['/login']);
  }

}
