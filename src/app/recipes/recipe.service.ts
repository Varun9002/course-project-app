import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - Just awsome! ',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('Fries', 20)]
    ),
    new Recipe(
      'A Test Recipe2',
      'This is simply a test',
      'https://readyseteat.com/sites/g/files/qyyrlu501/files/uploadedImages/img_6940_6060.JPEG',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  recipeUpdated = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
      this.recipeUpdated.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
  getRecipeIndex(recipe: Recipe) {
    return this.recipes.findIndex((r: Recipe) => {
      r.name === recipe.name;
    });
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeUpdated.next(this.recipes.slice());
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeUpdated.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeUpdated.next(this.recipes.slice());
  }
}
