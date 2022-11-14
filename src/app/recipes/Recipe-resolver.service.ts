import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	Resolve,
	RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import { Actions, ofType } from '@ngrx/effects';
import * as RecipeActions from './store/recipe.action';
import { map, Observable, of, switchMap, take } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class RecipeResolverService implements Resolve<any> {
	constructor(
		private store: Store<fromApp.AppState>,
		private actions$: Actions
	) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.store.select('recipe').pipe(
			take(1),
			map((recipeState) => {
				return recipeState.recipes;
			}),
			switchMap((recipes) => {
				if (recipes.length === 0) {
					this.store.dispatch(RecipeActions.FetchRecipes());
					return this.actions$.pipe(
						ofType(RecipeActions.SetRecipe),
						take(1)
					);
				}
				return recipes;
			})
		);
	}
}
