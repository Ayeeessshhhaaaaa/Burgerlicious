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
  ingredientsCheck:any=false;
  ingredientItemsCheck:any=false;

  @Output() itemAdded = new EventEmitter<void>();
  
  constructor(private customizeService:CustomizeServiceService, private CustomizeSessionService: CustomizeSessionSeriveService) {
  } 

   ngOnInit(): void {
    
    this.customizeService.getIngredients().subscribe(
      (data) => {
        this.ingredients = data; 
        this.ingredientsCheck=true;
        console.log(this.ingredients);
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

        for (let i=0; i<data.length;i++)
        {
          this.customizeService.getImageAsBase64(data[i].ImageURL)
              .subscribe(base64 => {
                data[i].ImageURL = 'data:image/png;base64,' + base64;
          });
        }



        this.ingredientItems = data; 
        this.ingredientItemsCheck=true;
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

}
