import { Component } from '@angular/core';
import { AdminFeedbackServiceService } from 'src/app/Services/admin-feedback-service/admin-feedback-service.service';
import { FeedbackServiceService } from 'src/app/Services/feedback-service/feedback-service.service';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss']
})
export class AdminFeedbackComponent {

  adminUser:any;

  myScriptElement: HTMLScriptElement;
  allFeedbacks: any;

  loaderFixScriptElement: HTMLScriptElement;

  constructor(private feedbackService: AdminFeedbackServiceService) {
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "assets/scripts/datatable.js";
    document.body.appendChild(this.myScriptElement);

    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  ngOnInit(): void {

    this.adminUser = localStorage.getItem('Username')==="admin";

    this.feedbackService.getFeedback().subscribe(
      (data) => {
        // Handle the API response data here
        this.allFeedbacks = data;
        console.log(data);
      },
      (error) => {
        // Handle any errors here
        console.error(error);
      });
  }

  delete(ReviewID: number) {
    if (confirm('Are you sure you want to delete this feedback?')) {
      console.log(ReviewID);
      this.feedbackService.deleteFeedback(ReviewID).subscribe(
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
