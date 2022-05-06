import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient";

@Injectable()
export class ShoppingListService{

    ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes",1)
    ];
    ingUdated = new Subject<Ingredient[]>();
    editIndex = new Subject<number>();
    startedEditting = new Subject<number>();
    getIngredients() {
        return this.ingredients.slice();
    }
    getIngredient(i: number) {
        return this.ingredients[i];
    }
    addIngredient(ing:Ingredient) {
        this.ingredients.push(ing);
        this.ingUdated.next(this.ingredients.slice());
    }
    addIngredients(ing: Ingredient[]) {
        this.ingredients.push(...ing);
        this.ingUdated.next(this.ingredients.slice());
    }
    updateIngredient(i: number, ing: Ingredient){
        this.ingredients[i] = ing;   
        this.ingUdated.next(this.ingredients.slice());
    }
    deleteIngredient(index: number) {
        this.ingredients.splice(index,1);
        this.ingUdated.next(this.ingredients.slice());

    }
}