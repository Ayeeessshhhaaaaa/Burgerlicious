import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FeedbackServiceService } from 'src/app/Services/feedback-service/feedback-service.service';
import { feedbackModel } from 'src/app/Models/feedbackModel';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackSearchComponent } from 'src/app/Components/feedback-search/feedback-search.component';

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
isSearchExpanded: boolean = false;
searchQuery: string = '';
constructor(private sanitizer: DomSanitizer, private feedbackService: FeedbackServiceService,private router: Router, public dialog: MatDialog) {
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

toggleSearch(): void {
  this.isSearchExpanded = !this.isSearchExpanded;
}

onKeyUp(event: KeyboardEvent) {
  if (event.key === 'Enter' && this.searchQuery != "") {
    this.openDialog();
  }
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


openDialog(): void {
  this.loader(true, 4000);
  const searchQuery = this.searchQuery.toLowerCase();
  this.feedbackService.searchFeedback(this.searchQuery).subscribe(
    (response) => {
      const dialogRef = this.dialog.open(FeedbackSearchComponent, {
        height: window.innerWidth < 968 ? '100vh' : '600px',
        width: '80vw',
        maxWidth: '100vw',
        data: { response, searchQuery }, // Pass the search results as data to the dialog component
      });

      // Reset the flag when the dialog is closed
      dialogRef.afterClosed().subscribe(() => {});
    },
    (error) => {
      console.error('Error occurred during search:', error);
    }
  );
}

}

