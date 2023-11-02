import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class CustomizeSessionSeriveService {

  // Define the array to store IngredientId values
  customizeIngredient: any[] = [];


  addToCustomization(Ingredient: any) {
    console.log('addToCustomization - Before:', this.customizeIngredient);
  
    const itemIndex = this.customizeIngredient.findIndex((item) => item.IngredientID === Ingredient.IngredientID);
  
    // Check if the item is not already in the array
    if (itemIndex === -1) {
      this.customizeIngredient.unshift({ Ingredient }); // Add the new ingredient to the beginning
      this.updatecustomizeStorage(); // Store the updated data in local storage
    }
  
    console.log('addToCustomization - After:', this.customizeIngredient);
  }
  
  removeCustomizationFromContainer(IngredientID: number) {
    this.customizeIngredient.splice(IngredientID, 1);
    this.updatecustomizeStorage();
  }

  getCustomizeItems() {
    return this.customizeIngredient;
  }

  clearCustomize(): void {
    this.customizeIngredient = [];
    this.clearCustomize();
    console.log('Clearing customization...');
    console.log('Customization cleared:', this.customizeIngredient);
  }

  private clearCustomizeStorage() {
    localStorage.removeItem('customizeItems');
  }

  updatecustomizeStorage() {
    localStorage.setItem('customizeItems', JSON.stringify(this.customizeIngredient));
  }

  private loadcustomizeFromStorage() {
    const customizeItemsString = localStorage.getItem('customizeItems');

    if (customizeItemsString) {
      this.customizeIngredient = JSON.parse(customizeItemsString);
    }
  }

  constructor() {
    this.loadcustomizeFromStorage();
 }
}
