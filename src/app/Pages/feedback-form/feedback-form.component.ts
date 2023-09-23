import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgForm } from '@angular/forms'; // Import NgForm for form handling
import { FeedbackServiceService } from 'src/app/Services/feedback-service/feedback-service.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent {
  imageUrl: string = 'assets/homescreen-image.png';
sanitizedImageUrl: SafeUrl;
formData: any = {};
constructor(private sanitizer: DomSanitizer, private service: FeedbackServiceService) {
this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
}
onSubmit(form: NgForm) {
  if (form.valid) {
    this.service.sendFeedback(this.formData).subscribe(
      (response) => {
        console.log('Feedback sent successfully:', response);
        // You can reset the form or display a success message here
      },
      (error) => {
        console.error('Error sending feedback:', error);
        // Handle errors, display an error message, etc.
      }
    );
  } else {
    console.log('Form is invalid. Please check the input fields.');
  }
}
}
