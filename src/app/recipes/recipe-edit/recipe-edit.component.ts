import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	UntypedFormArray,
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as RecipeActions from '../store/recipe.action';
import { map, Subscription } from 'rxjs';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
	id: number;
	editmode = false;
	recForm: UntypedFormGroup;
	storeSub: Subscription;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<fromApp.AppState>
	) {}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.id = +params['id'];
			this.editmode = params['id'] != null;
			this.initForm();
		});
	}

	onSubmit() {
		if (this.editmode) {
			this.store.dispatch(
				RecipeActions.UpdateRecipe({
					id: this.id,
					recipe: this.recForm.value,
				})
			);
		} else {
			this.store.dispatch(RecipeActions.AddRecipe(this.recForm.value));
		}
		this.onCancel();
	}

	onCancel() {
		this.router.navigate(['..'], { relativeTo: this.route });
	}
	private initForm() {
		let recName = '';
		let recImagePath = '';
		let recDescription = '';
		let recIngredients = new UntypedFormArray([]);
		if (this.editmode) {
			this.storeSub = this.store
				.select('recipe')
				.pipe(
					map((recipeState) => {
						return recipeState.recipes.find((recipe, index) => {
							return index === this.id;
						});
					})
				)
				.subscribe((recipe) => {
					recName = recipe.name;
					recImagePath = recipe.imagePath;
					recDescription = recipe.description;
					if (recipe['ingredients']) {
						for (const ing of recipe.ingredients) {
							recIngredients.push(
								new UntypedFormGroup({
									name: new UntypedFormControl(
										ing.name,
										Validators.required
									),
									amount: new UntypedFormControl(ing.amount, [
										Validators.required,
										Validators.pattern(/^[1-9]+[0-9]*$/),
									]),
								})
							);
						}
					}
				});
		}
		this.recForm = new UntypedFormGroup({
			name: new UntypedFormControl(recName, Validators.required),
			imagePath: new UntypedFormControl(
				recImagePath,
				Validators.required
			),
			description: new UntypedFormControl(
				recDescription,
				Validators.required
			),
			ingredients: recIngredients,
		});
	}

	onAddIngredient() {
		(<UntypedFormArray>this.recForm.get('ingredients')).push(
			new UntypedFormGroup({
				name: new UntypedFormControl(null, Validators.required),
				amount: new UntypedFormControl(null, [
					Validators.required,
					Validators.pattern(/^[1-9]+[0-9]*$/),
				]),
			})
		);
	}

	getIngCtrls() {
		return (<UntypedFormArray>(
			this.recForm.get('ingredients')
		)).controls.slice();
	}

	onDeleteIng(index: number) {
		(<UntypedFormArray>this.recForm.get('ingredients')).removeAt(index);
	}
	ngOnDestroy() {
		if (this.storeSub) {
			this.storeSub.unsubscribe();
		}
	}
}
