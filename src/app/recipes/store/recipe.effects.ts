import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as fromApp from 'src/app/store/app.reducer';

import * as RecipeActions from './recipe.action';
@Injectable()
export class RecipeEffects {
	constructor(
		private actions$: Actions,
		private http: HttpClient,
		private store: Store<fromApp.AppState>
	) {}

	fetchRecipes$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecipeActions.FetchRecipes),
			switchMap(() => {
				return this.http
					.get<Recipe[]>(
						'https://recipe-book-v-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
					)
					.pipe(
						map((recipes) => {
							return recipes.map((recipe) => {
								return {
									...recipe,
									ingredients: recipe.ingredients
										? recipe.ingredients
										: [],
								};
							});
						}),
						map((recipes) => {
							return RecipeActions.SetRecipe({ recipes });
						})
					);
			})
		);
	});

	storeRecipes$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(RecipeActions.StoreRecipes),
				withLatestFrom(this.store.select('recipe')),
				switchMap(([actionData, recipeState]) => {
					return this.http.put(
						'https://recipe-book-v-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
						recipeState.recipes
					);
				})
			);
		},
		{ dispatch: false }
	);
}
