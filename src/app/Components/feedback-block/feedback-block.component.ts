import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-block',
  templateUrl: './feedback-block.component.html',
  styleUrls: ['./feedback-block.component.scss']
})
export class FeedbackBlockComponent {
  @Input() ReviewID: number | undefined;
  @Input() OrderID: number | undefined;
  @Input() UserID: number | undefined;
  @Input() Rating: number | undefined;
  @Input() Comment: string | undefined;
  @Input() imageURL: string | undefined;
  @Input() burgerName: string | undefined;
  @Input() Name: string | undefined;
constructor(private sanitizer: DomSanitizer, private router:Router) {
}
redirectToDetailsPage()
{
  if (this.ReviewID)
  {
    this.router.navigate(['/feedback-details',this.ReviewID]);
  } 
}
}
