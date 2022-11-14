import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SetRecipe = createAction(
	'[Recipe] Set recipes',
	props<{ recipes: Recipe[] }>()
);
export const FetchRecipes = createAction('[Recipe] Fetch Recipe');
export const AddRecipe = createAction('[Recipe] Add Recipe', props<Recipe>());
export const DeleteRecipe = createAction(
	'[Recipe] Delete Recipe',
	props<{ id: number }>()
);
export const UpdateRecipe = createAction(
	'[Recipe] Update Recipe',
	props<{ id: number; recipe: Recipe }>()
);

export const StoreRecipes = createAction('[Recipe] Store Recipes');
