import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { feedbackModel } from 'src/app/Models/feedbackModel';

@Component({
  selector: 'app-feedback-search',
  templateUrl: './feedback-search.component.html',
  styleUrls: ['./feedback-search.component.scss']
})
export class FeedbackSearchComponent {
  searchData: feedbackModel[] | undefined;

  constructor(
    public dialogRef: MatDialogRef<FeedbackSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
) {
  this.searchData = data.response;
}

closeDialog(): void {
    this.dialogRef.close();
}

}
