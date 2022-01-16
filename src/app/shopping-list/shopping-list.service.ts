import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Ingredient } from "../shared/ingredient";

@Injectable()
export class ShoppingListService{

    ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes",1)
    ];
    ingUdated = new EventEmitter<Ingredient[]>()
    getIngredient() {
        return this.ingredients.slice();
    }
    addIngredient(ing:Ingredient) {
        this.ingredients.push(ing);
        this.ingUdated.emit(this.ingredients);
    }
    addIngredients(ing: Ingredient[]) {
        this.ingredients.push(...ing);
        this.ingUdated.emit(this.ingredients);
}
}