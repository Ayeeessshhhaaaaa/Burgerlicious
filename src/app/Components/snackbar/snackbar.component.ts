import { Component, Inject } from '@angular/core';
import {MatSnackBarRef, MAT_SNACK_BAR_DATA,} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string },
    private snackBarRef: MatSnackBarRef<SnackbarComponent>,
    private route: ActivatedRoute
  ) {
    console.log(data.message);
  }

  dismissWithAction(): void {
    this.snackBarRef.dismiss();
  }
}
