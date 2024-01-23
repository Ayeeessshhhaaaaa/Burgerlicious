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
  stars = ['star', 'star', 'star', 'star', 'star'];
  selectedStar: number | null = null;
  hoveredStar: number | null = null;
  showLoader: boolean=false;
  customizeImage: string = '';

constructor(private sanitizer: DomSanitizer, private service: FeedbackServiceService, private snackBar: MatSnackBar, private datashare: DataSharingService) {
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

    this.selectedStar = this.formData.Rating;
    console.log(this.selectedStar);
  }
}
onSubmit(form: NgForm) {
  if (form.valid) {
    const customizedImageUrl = localStorage.getItem('cartItems');
    // Check if the customized image URL is available
    if (customizedImageUrl) {
      const customizeData = JSON.parse(customizedImageUrl);
      this.customizeImage = customizeData[0].item.customizeImg;
    }
    if (this.editStatus) {
      this.loader(true, 6000);
      this.formData.Rating = this.selectedStar; // Set the selected star number in formData
      console.log(this.formData);
      this.service.updateFeedback(this.formData).subscribe(
        (response) => {
          console.log('Feedback updated successfully:', response);
          this.openSnackBar('Successfully submitted Feedback');
          this.datashare.setEditStatus(false);
          form.resetForm();
          this.selectedStar = null; // Reset the star rating
        },
        (error) => {
          console.error('Error sending feedback:', error);
          this.openErrorSnackBar('Error in Updating.');
        }
      );
    } else {
      this.loader(true, 6000);
      this.formData.Rating = this.selectedStar; // Set the selected star number in formData
      this.formData.customizeImg = this.customizeImage;
      this.service.sendFeedback(this.formData).subscribe(
        (response) => {
          console.log('Feedback sent successfully:', response);
          this.openSnackBar('Successfully submitted Feedback');
          form.resetForm();
          this.selectedStar = null; // Reset the star rating
        
        },
        (error) => {
          console.error('Error sending feedback:', error);
          this.openErrorSnackBar('Error sending feedback.');
        }
      );
    }
  } else {
    console.log('Form is invalid. Please check the input fields.');
    this.openErrorSnackBar('Form is invalid. Please check the input fields.');
  }
}

openSnackBar(message: string) {
  this.snackBar.openFromComponent(SnackbarComponent, {
    data: { message },
    duration: 3000,
    panelClass: 'success-snackbar',
  });
}
openErrorSnackBar(message: string) {
  this.snackBar.openFromComponent(SnackbarComponent, {
    data: { message },
    duration: 3000,
    panelClass: 'error-snackbar',
  });
}

onStarHover(index: number): void {
  this.hoveredStar = index + 1;
}

onMouseOut(): void {
  this.hoveredStar = null;
}

onStarClick(index: number): void {
  this.selectedStar = index + 1;
  console.log(`Selected: ${this.selectedStar}`);
}

loader(state: boolean, duration: number) {
  this.showLoader = state;

  if (state) {
    // If the state is true (show loader), set a timeout to hide it after the specified duration
    setTimeout(() => {
      this.showLoader = false;
    }, duration);
  }
}

}
