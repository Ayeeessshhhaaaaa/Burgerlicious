import { Component } from '@angular/core';
import { AdminUserService } from 'src/app/Services/admin-user-service/admin-user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
  myScriptElement: HTMLScriptElement;
  allUsers:any;

  constructor(private userService: AdminUserService) { 
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "assets/scripts/datatable.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        // Handle the API response data here
        this.allUsers = data;
        console.log(data);
      },
      (error) => {
        // Handle any errors here
        console.error(error);
      });
  }

  delete(UserID: number) {
    if (confirm('Are you sure you want to delete this feedback?')) {
      console.log(UserID);
      this.userService.deleteUser(UserID).subscribe(
        (response) => {
          console.log('User deleted successfully:', response);
          // Reload the page after successful deletion
        location.reload();
          // Handle success, e.g., remove the deleted item from the UI
        },
        (error) => {
          console.error('Error deleting feedback:', error);
          // Handle errors, display an error message, etc.
        }
      );
    }
  }

}
