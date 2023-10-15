import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ingredients-slider',
  templateUrl: './ingredients-slider.component.html',
  styleUrls: ['./ingredients-slider.component.scss']
})
export class IngredientsSliderComponent {
  imageUrl: string = 'assets/base-bun.png';
  sanitizedImageUrl: SafeUrl;
  ingredients = [
    { name: 'Base Bun', imageUrl: 'assets/base-bun.png' },
    { name: 'Cheese', imageUrl: 'assets/cheese.png' },
    { name: 'Patty', imageUrl: 'assets/patty.png' },
    { name: 'Salads', imageUrl: 'assets/lettuce.png' },
    { name: 'Extra Filling', imageUrl: 'assets/onion.png' },
    { name: 'Sauces', imageUrl: 'assets/sauce.png' },
    { name: 'Top Bun', imageUrl: 'assets/top-bun.png' },
  ];
  ingredientsImage = [
    { name: 'Base Bun', imageUrl: 'assets/base-bun.png' },
    { name: 'Base Bun', imageUrl: 'assets/base-bun.png' },
  ];
  constructor(private sanitizer: DomSanitizer) {
    this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }
}
