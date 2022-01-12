import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelect = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("A Test Recipe", "This is simply a test", "https://readyseteat.com/sites/g/files/qyyrlu501/files/uploadedImages/img_6940_6060.JPEG"),
    new Recipe("A Test Recipe2", "This is simply a test", "https://readyseteat.com/sites/g/files/qyyrlu501/files/uploadedImages/img_6940_6060.JPEG"),
    new Recipe("A Test Recipe3", "This is simply a test", "https://readyseteat.com/sites/g/files/qyyrlu501/files/uploadedImages/img_6940_6060.JPEG")
    
  ]
  onRecipeSelect(index: number) {
    this.recipeSelect.emit(this.recipes[index])
  }
  constructor() { }

  ngOnInit(): void {
  }

}
