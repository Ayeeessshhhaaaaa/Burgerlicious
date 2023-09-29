import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FeedbackServiceService } from 'src/app/Services/feedback-service/feedback-service.service';

@Component({
  selector: 'app-feedback-details-screen',
  templateUrl: './feedback-details-screen.component.html',
  styleUrls: ['./feedback-details-screen.component.scss']
})
export class FeedbackDetailsScreenComponent implements OnInit {
  ReviewID: number|undefined;
  feedbackData:any;
  constructor(private router: ActivatedRoute, private feedbackService: FeedbackServiceService ) {
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
}