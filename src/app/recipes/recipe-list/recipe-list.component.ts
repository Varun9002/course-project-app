import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
	recipes: Recipe[] = [];
	recSubs!: Subscription;

	constructor(private store: Store<fromApp.AppState>) {}

	ngOnInit(): void {
		// this.recSubs = this.recipeService.recipeUpdated.subscribe((recipes: Recipe[]) => {
		//   this.recipes = recipes;
		// });
		// this.recipes = this.recipeService.getRecipes();
		this.recSubs = this.store.select('recipe').subscribe((recipeState) => {
			this.recipes = recipeState.recipes;
		});
	}
	ngOnDestroy() {
		this.recSubs.unsubscribe();
	}
}
