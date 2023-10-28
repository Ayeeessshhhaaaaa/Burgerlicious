import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import { CustomizeSessionSeriveService } from 'src/app/Services/customize-session-serive.service';
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
      console.log('Before parsing:', item.Ingredient.Price);
      const priceAsNumber = parseFloat(item.Ingredient.Price);
      console.log('After parsing:', priceAsNumber);
  
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

  saveImageToAssets(imageData: Blob, fileName: string) {
    saveAs(imageData, fileName);
  }
  
  generateImageData() {
    const canvasElement = this.canvas;
  
    if (canvasElement) {
      const canvas = canvasElement.nativeElement;
      const context = canvas.getContext('2d');
  
      if (context) {
        // Set canvas size (adjust as needed)
        canvas.width = 300;
        canvas.height = 200;
  
        // Draw something on the canvas (e.g., a red rectangle)
        context.fillStyle = 'red';
        context.fillRect(0, 0, canvas.width, canvas.height);
  
        // Get the image data as a Blob
        canvas.toBlob((blob) => {
          if (blob) {
            this.saveImageToAssets(blob, 'myImage.png');
          } else {
            console.error('Failed to create Blob.');
          }
        });
      } else {
        console.error('Canvas context is null. Cannot draw on the canvas.');
      }
    } else {
      console.error('Canvas element is not available.');
    }
  }
  
}
