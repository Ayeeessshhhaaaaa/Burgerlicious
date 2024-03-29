

import { Component,OnInit,EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CustomizeServiceService } from 'src/app/Services/customize-service/customize-service.service';
import { CustomizeSessionSeriveService } from 'src/app/Services/customize-session/customize-session-serive.service';

@Component({
  selector: 'app-ingredients-slider',
  templateUrl: './ingredients-slider.component.html',
  styleUrls: ['./ingredients-slider.component.scss']
})
export class IngredientsSliderComponent implements OnInit{

  ingredients: any[]=[];
  ingredientItems: any[]=[];

  @Output() itemAdded = new EventEmitter<void>();

  constructor(private customizeService:CustomizeServiceService, private CustomizeSessionService: CustomizeSessionSeriveService, private sanitizer: DomSanitizer) {
  }

   ngOnInit(): void {

    this.customizeService.getIngredients().subscribe(
      (data) => {
        this.ingredients = data;
        this.loadIngredientImages();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // Function to handle item click in the carousel-container
  onItemClick(CategoryID: number) {
    // Make an API call to get the ingredient details based on its ID
    this.customizeService.getItems(CategoryID).subscribe(
      (data) => {
        this.ingredientItems = data;
        this.loadClickedIngredientImages();
        console.log(this.ingredientItems);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  addToCustomization(Ingredient: any) {
    try {
      this.CustomizeSessionService.addToCustomization(Ingredient);
      console.log('Item Added to Customization');
    } catch (error) {
      console.log('Item failed');
   }
   this.itemAdded.emit();
  }

  loadIngredientImages(): void {
    this.ingredients.forEach((ingredient) => {
      const imagePath = ingredient.imageURL; // Replace with the actual property name in your data

      this.customizeService.getImage(imagePath).subscribe(
        (dataUrl: string) => {
          const imageUrll = dataUrl;
          ingredient.imageURL = this.sanitizer.bypassSecurityTrustUrl(imageUrll);
        },
        (error) => {
          console.error(`Error loading image for ingredient ${ingredient.name}:`, error);
        }
      );
    });
  }

  loadClickedIngredientImages(): void {
    this.ingredientItems.forEach((ingredientitem) => {
      const imagePath = ingredientitem.ImageURL;

      this.customizeService.getImage(imagePath).subscribe(
        (dataUrl: string) => {
          const imageUrll = dataUrl;
          ingredientitem.ImageURL = this.sanitizer.bypassSecurityTrustUrl(imageUrll);
        },
        (error) => {
          console.error(`Error loading image for ingredient ${ingredientitem.name}:`, error);
        }
      );
    });
  }

}