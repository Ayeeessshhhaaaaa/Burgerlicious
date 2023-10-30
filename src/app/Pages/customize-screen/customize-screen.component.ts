import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import { CustomizeSessionSeriveService } from 'src/app/Services/customize-session-serive.service';
import * as html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-customize-screen',
  templateUrl: './customize-screen.component.html',
  styleUrls: ['./customize-screen.component.scss']
})
export class CustomizeScreenComponent implements OnInit {
  imageHeight: number = 50;
  sessionDataArray: any[] = [];
  totalPrice: number|undefined;
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;



  constructor(private customizeSessionService: CustomizeSessionSeriveService) { }

  ngOnInit() {
    // Get ingredients from local storage (without reversing the order)
    this.sessionDataArray = this.customizeSessionService.getCustomizeItems();
    console.log(this.sessionDataArray);
    this.totalPrice = this.calculateTotalPrice();
    console.log('hi')
  }

  removeIngredient(index: number) {
    // Update local storage to reflect the changes
    this.customizeSessionService.removeCustomizationFromContainer(index);
    this.totalPrice = this.calculateTotalPrice();
  }

  moveImageUp(index: number) {
    if (index > 0) {
      const temp = this.sessionDataArray[index];
      this.sessionDataArray[index] = this.sessionDataArray[index - 1];
      this.sessionDataArray[index - 1] = temp;
    }
  }
  
  moveImageDown(index: number) {
    if (index < this.sessionDataArray.length - 1) {
      const temp = this.sessionDataArray[index];
      this.sessionDataArray[index] = this.sessionDataArray[index + 1];
      this.sessionDataArray[index + 1] = temp;
    }
  }

  recalculateTotalAmount() {
    // Recalculate the total amount
    this.totalPrice = this.calculateTotalPrice();
  }

  // Create a method to calculate the total price
  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.sessionDataArray) {
      const priceAsNumber = parseFloat(item.Ingredient.Price);
  
      if (!isNaN(priceAsNumber)) {
        totalPrice += priceAsNumber;
      }
    }
    return totalPrice;
  }
  
  clearCustomization(){
    console.log(this.sessionDataArray);
    this.sessionDataArray=[];
    console.log(this.sessionDataArray);
  }

  
  captureAndSaveImage(): void {
    const imageContainer = document.querySelector('.imageContainer') as HTMLElement;
  
    // Use HTML2Canvas to capture the contents of .imageContainer
    (html2canvas as any)(imageContainer).then((canvas: HTMLCanvasElement) => {
      // Convert the canvas to a Blob
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          // Use FileSaver.js to save the Blob as an image file
          saveAs(blob, 'burgerimg.png');
        } else {
          console.error('Failed to create Blob.');
        }
      });
    });
  }
  
}
