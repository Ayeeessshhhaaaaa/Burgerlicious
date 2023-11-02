import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { CustomizeServiceService } from 'src/app/Services/customize-service/customize-service.service';
import { blob } from 'stream/consumers';

@Component({
  selector: 'app-customize-confirm',
  templateUrl: './customize-confirm.component.html',
  styleUrls: ['./customize-confirm.component.scss']
})
export class CustomizeConfirmComponent {
  burgerName: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private route: Router, private dialogRef: MatDialogRef<CustomizeConfirmComponent>, private snackBar: MatSnackBar, private customizeService: CustomizeServiceService) {}

  addToCart(): void {
    if (this.burgerName.trim() === '') {
      this.openErrorSnackBar('Ooopsyyy. Lets add a yummy name to your Burger.');
    } else {
      this.customizeService.saveImageToAssets(this.data.blob).subscribe(
        (response) => {
          console.log('Image saved successfully');
          this.route.navigate(['/cart']);
          this.dialogRef.close(this.burgerName);
        },
        (error) => {
          console.error('Failed to save the image:', error);
        }
      );
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
