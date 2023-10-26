import { Component, OnInit } from '@angular/core';
import { CustomizeSessionSeriveService } from 'src/app/Services/customize-session-serive.service';

@Component({
  selector: 'app-customize-screen',
  templateUrl: './customize-screen.component.html',
  styleUrls: ['./customize-screen.component.scss']
})
export class CustomizeScreenComponent implements OnInit {
  imageHeight: number = 70;
  sessionDataArray: any[] = [];
  totalPrice: number|undefined;

  constructor(private customizeSessionService: CustomizeSessionSeriveService) { }

  ngOnInit() {
    // Get ingredients from local storage (without reversing the order)
    this.sessionDataArray = this.customizeSessionService.getCustomizeItems();
    console.log(this.sessionDataArray);
    this.totalPrice = this.calculateTotalPrice();
    console.log('hi')
  }

  removeIngredient(index: number) {
    // Remove the ingredient at the specified index
    this.sessionDataArray.splice(index, 1);
    // Update local storage to reflect the changes
    this.customizeSessionService.addToCustomization(this.sessionDataArray);
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
}
