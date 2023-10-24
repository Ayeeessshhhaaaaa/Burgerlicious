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
    console.log('addToCart - Before:', this.customizeIngredient);

    const itemIndex = this.customizeIngredient.findIndex((item) => item.IngredientID === Ingredient.IngredientID);

      this.customizeIngredient.push({ Ingredient });

    console.log('addToCart - After:', this.customizeIngredient);

    this.updatecustomizeStorage();
  }


  removeCustomizationFromContainer(IngredientID: number) {
    this.customizeIngredient = this.customizeIngredient.filter((item) => item.IngredientID !== IngredientID);
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

  private updatecustomizeStorage() {
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
