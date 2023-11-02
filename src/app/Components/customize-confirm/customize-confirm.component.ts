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
  customizeImg: string = '';
  ingredientID: Number = 0 ;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private route: Router, private dialogRef: MatDialogRef<CustomizeConfirmComponent>, private snackBar: MatSnackBar, private customizeService: CustomizeServiceService) {
    if (data.capturedImage) {
     
      console.log("cominggg00");
    } else {
      // Data is not provided, handle this case (e.g., show an error message)
      console.error('No capturedImage data provided.');
    }
  }

  addToCart(): void {
    if (this.burgerName.trim() === '') {
      this.openErrorSnackBar('Ooopsyyy. Lets add a yummy name to your Burger.');
    } else {

      this.customizeService.uploadIngredientImage(this.burgerName, this.data.blob).subscribe(
        (response) => {
          console.log('Image upload success:', response);

          const requestBody = {
            customizeName: this.burgerName, 
            customizeImg: response.data, 
            ingredientID: this.data.sessionDataArray,
            price: this.calculateTotalPrice(this.data.sessionDataArray)

          };

          if (response && response.data) {
            // Save requestBody in sessionStorage
            sessionStorage.setItem('customizationData', JSON.stringify(requestBody));
            console.log('requestbody', requestBody);
            this.route.navigate(['/cart']);
          }
          
          
        },


        (error) => {
          // Handle API error.
          console.error('Image upload failed:', error);
        }
      );


    }
  }


  calculateTotalPrice(sessionDataArray: any): number {
    let totalPrice = 0;
    for (const item of sessionDataArray) {
      const priceAsNumber = parseFloat(item.Ingredient.Price);
  
      if (!isNaN(priceAsNumber)) {
        totalPrice += priceAsNumber;
      }
    }
    return totalPrice;
  }

  continueShopping(){
    if (this.burgerName.trim() === '') {
      this.openErrorSnackBar('Ooopsyyy. Lets add a yummy name to your Burger.');
    } else {

      this.customizeService.uploadIngredientImage(this.burgerName, this.data.blob).subscribe(
        (response) => {
          console.log('Image upload success:', response);

          const requestBody = {
            customizeName: this.burgerName, 
            customizeImg: response.data, 
            ingredientID: this.data.sessionDataArray,
            price: this.calculateTotalPrice(this.data.sessionDataArray)

          };

          if (response && response.data) {
            // Save requestBody in sessionStorage
            sessionStorage.setItem('customizationData', JSON.stringify(requestBody));
            console.log('requestbody', requestBody);
            this.route.navigate(['/product-page']);
            this.closeDialog();
          }
          
          
        },


        (error) => {
          // Handle API error.
          console.error('Image upload failed:', error);
        }
      );


    }
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