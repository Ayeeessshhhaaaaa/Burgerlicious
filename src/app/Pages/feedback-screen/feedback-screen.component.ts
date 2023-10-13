import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FeedbackServiceService } from 'src/app/Services/feedback-service/feedback-service.service';
import { feedbackModel } from 'src/app/Models/feedbackModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-feedback-screen',
  templateUrl: './feedback-screen.component.html',
  styleUrls: ['./feedback-screen.component.scss']
})
export class FeedbackScreenComponent implements OnInit{
  feedbackData: feedbackModel[] | undefined;
  imageUrl: string = 'assets/Ellipse.png';
sanitizedImageUrl: SafeUrl;
showLoader: boolean=false;
constructor(private sanitizer: DomSanitizer, private feedbackService: FeedbackServiceService,private router: Router) {
this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
}
ngOnInit(): void {
  this.loader(true, 4000);
  this.feedbackService.getFeedback().subscribe(
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
