import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient";

@Injectable()
export class ShoppingListService{

    ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes",1)
    ];
    ingUdated = new Subject<Ingredient[]>()
    getIngredient() {
        return this.ingredients.slice();
    }
    addIngredient(ing:Ingredient) {
        this.ingredients.push(ing);
        this.ingUdated.next(this.ingredients);
    }
    addIngredients(ing: Ingredient[]) {
        this.ingredients.push(...ing);
        this.ingUdated.next(this.ingredients);
}
}