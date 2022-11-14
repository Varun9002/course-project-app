import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.action';

export interface State {
	recipes: Recipe[];
}
const initialState: State = {
	recipes: [],
};
export const RecipeReducer = createReducer(
	initialState,
	on(RecipeActions.SetRecipe, (state, { recipes }) => ({
		...state,
		recipes: [...recipes],
	})),
	on(RecipeActions.AddRecipe, (state, action) => ({
		...state,
		recipes: [...state.recipes, action],
	})),
	on(RecipeActions.UpdateRecipe, (state, action) => {
		const updatedRecipe = { ...state.recipes[action.id], ...action.recipe };
		const updatedRecipes = [...state.recipes];
		updatedRecipes[action.id] = updatedRecipe;
		return {
			...state,
			recipes: updatedRecipes,
		};
	}),
	on(RecipeActions.DeleteRecipe, (state, action) => ({
		...state,
		recipes: state.recipes.filter((recipe, index) => {
			return index !== action.id;
		}),
	}))
);
