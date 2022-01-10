import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("A Test Recipe", "This is simply a test", "https://get.pxhere.com/photo/tomato-food-cuisine-pasta-dishware-ingredient-tableware-dish-plate-recipe-meal-serveware-vegetable-produce-garnish-brunch-breakfast-vegetarian-food-culinary-art-side-dish-mixture-kitchen-utensil-italian-food-staple-food-bowl-pasta-salad-cooking-leaf-vegetable-orecchiette-supper-Food-group-platter-fast-food-snack-whole-food-mixing-bowl-superfood-lunch-salad-al-dente-la-carte-food-1636257.jpg"),
    new Recipe("A Test Recipe", "This is simply a test", "https://get.pxhere.com/photo/tomato-food-cuisine-pasta-dishware-ingredient-tableware-dish-plate-recipe-meal-serveware-vegetable-produce-garnish-brunch-breakfast-vegetarian-food-culinary-art-side-dish-mixture-kitchen-utensil-italian-food-staple-food-bowl-pasta-salad-cooking-leaf-vegetable-orecchiette-supper-Food-group-platter-fast-food-snack-whole-food-mixing-bowl-superfood-lunch-salad-al-dente-la-carte-food-1636257.jpg"),
    new Recipe("A Test Recipe", "This is simply a test", "https://get.pxhere.com/photo/tomato-food-cuisine-pasta-dishware-ingredient-tableware-dish-plate-recipe-meal-serveware-vegetable-produce-garnish-brunch-breakfast-vegetarian-food-culinary-art-side-dish-mixture-kitchen-utensil-italian-food-staple-food-bowl-pasta-salad-cooking-leaf-vegetable-orecchiette-supper-Food-group-platter-fast-food-snack-whole-food-mixing-bowl-superfood-lunch-salad-al-dente-la-carte-food-1636257.jpg")
    
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
