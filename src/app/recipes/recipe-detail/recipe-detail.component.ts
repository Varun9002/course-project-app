import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as RecipeActions from '../store/recipe.action';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
	recipe!: Recipe;
	id!: number;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<fromApp.AppState>
	) {}
	ngOnInit(): void {
		this.route.params
			.pipe(
				map((params: Params) => {
					return +params['id'];
				}),
				switchMap((id) => {
					this.id = id;
					return this.store.select('recipe');
				}),
				map((recipeState) => {
					return recipeState.recipes.find((recipe, index) => {
						return index === this.id;
					});
				})
			)
			.subscribe((recipe) => {
				this.recipe = recipe;
			});
	}

	onAddToShoppingList() {
		this.store.dispatch(
			ShoppingListActions.AddIngredients({
				ingredients: this.recipe.ingredients,
			})
		);
	}
	onDeleteRecipe() {
		this.store.dispatch(RecipeActions.DeleteRecipe({ id: this.id }));
		// this.recipeService.deleteRecipe(this.id);
		this.router.navigate(['..'], { relativeTo: this.route });
	}
}
