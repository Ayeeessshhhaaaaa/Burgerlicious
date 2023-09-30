import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgForm } from '@angular/forms'; // Import NgForm for form handling
import { FeedbackServiceService } from 'src/app/Services/feedback-service/feedback-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/Components/snackbar/snackbar.component';
import { DataSharingService } from 'src/app/Services/shared/data-sharing.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  imageUrl: string = 'assets/homescreen-image.png';
  sanitizedImageUrl: SafeUrl;
  formData: any = {};
  feedbackData: any;  
  editStatus: boolean = false;

constructor(private sanitizer: DomSanitizer, private service: FeedbackServiceService, private SnackBar: MatSnackBar, private datashare: DataSharingService) {
this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
}

ngOnInit(): void {
  // Retrieve the feedback data from the shared service
  this.editStatus = this.datashare.getEditStatus();
  this.feedbackData = this.datashare.getFeedbackData();
  console.log('feedbackData:', this.feedbackData);

  // Initialize formData with the first item from feedbackData
  if (this.feedbackData) {
    this.formData = { ...this.feedbackData };
  }
}

onSubmit(form: NgForm) {
  if (form.valid) {
    if(this.editStatus)
    {
      this.service.updateFeedback(this.formData).subscribe(
        (response) => {
          console.log('Feedback updated successfully:', response);
          this.datashare.setEditStatus(false);
          form.resetForm();
          this.openSnackBar('Successfully submitted Feedback');
        },
        (error) => {
          console.error('Error sending feedback:', error);
          // Handle errors, display an error message, etc.
        }
      );
    }else{
      this.service.sendFeedback(this.formData).subscribe(
        (response) => {
          console.log('Feedback sent successfully:', response);
          form.resetForm();
          this.openSnackBar('Successfully submitted Feedback');
        },
        (error) => {
          console.error('Error sending feedback:', error);
          // Handle errors, display an error message, etc.
        }
      );
    }

  } else {
    console.log('Form is invalid. Please check the input fields.');
  }
}
openSnackBar(message: string) {
  this.SnackBar.openFromComponent(SnackbarComponent, {
    data: { message },
    duration: 3000,
    });
}

}
