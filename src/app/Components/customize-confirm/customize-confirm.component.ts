import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-customize-confirm',
  templateUrl: './customize-confirm.component.html',
  styleUrls: ['./customize-confirm.component.scss']
})
export class CustomizeConfirmComponent {
  burgerName: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private route: Router, private dialogRef: MatDialogRef<CustomizeConfirmComponent>, private snackBar: MatSnackBar) {}

  addToCart(): void {
    if (this.burgerName.trim() === '') {
      this.openErrorSnackBar('Ooopsyyy. Lets add a yummy name to your Burger.');
    } else {
      this.route.navigate(['/cart-page']);
      this.dialogRef.close(this.burgerName);
    }
  }

  continueShopping(){
    this.route.navigate(['/product-page']);
    this.closeDialog();
  }

  openErrorSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message },
      duration: 2000,
      panelClass: 'error-snackbar',
    });
  }

  
  closeDialog(): void {
    this.dialogRef.close(this.burgerName);
  }
  
}
