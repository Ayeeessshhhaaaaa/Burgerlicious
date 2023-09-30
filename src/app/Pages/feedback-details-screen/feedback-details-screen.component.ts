import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FeedbackServiceService } from 'src/app/Services/feedback-service/feedback-service.service';
import { DataSharingService } from 'src/app/Services/shared/data-sharing.service';

@Component({
  selector: 'app-feedback-details-screen',
  templateUrl: './feedback-details-screen.component.html',
  styleUrls: ['./feedback-details-screen.component.scss']
})
export class FeedbackDetailsScreenComponent implements OnInit {
  ReviewID: number|undefined;
  feedbackData:any;
  constructor(private router: ActivatedRoute, private feedbackService: FeedbackServiceService, private datashare: DataSharingService, private route: Router) {
}
ngOnInit(): void {
  this.router.paramMap.subscribe((params) => {
    this.ReviewID = Number(params.get('ReviewID'));
    console.log(this.ReviewID);
    this.feedbackService.getFeedbackDetails(this.ReviewID).subscribe(
      (data) => {
        // Handle the API response data here
        this.feedbackData = data;
        console.log(data);
      },
      (error) => {
        // Handle any errors here
        console.error(error);
      }
    );
   });
}
onDelete(ReviewID: number) {
  if (confirm('Are you sure you want to delete this feedback?')) {
    this.feedbackService.deleteFeedback(ReviewID).subscribe(
      (response) => {
        console.log('Feedback deleted successfully:', response);
        // Handle success, e.g., remove the deleted item from the UI
      },
      (error) => {
        console.error('Error deleting feedback:', error);
        // Handle errors, display an error message, etc.
      }
    );
  }
}
onUpdateFeedback(feedbackData: any) {
  // Set the feedback data in the shared service
  this.datashare.setFeedbackData(feedbackData);
  this.datashare.setEditStatus(true);

  // Navigate to the "feedback-form" route
  this.route.navigate(['/feedback-form']);
}
}