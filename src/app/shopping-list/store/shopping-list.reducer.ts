import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
	ingredients: Ingredient[];
	edittedIng: Ingredient;
	editIngIndex: number;
}

const initialState: State = {
	ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 1)],
	edittedIng: null as Ingredient,
	editIngIndex: -1,
};

// export function shoppingListReducer(
// 	state = initialState,
// 	action: ShoppingListActions.ShoppingListActions
// ) {
// 	switch (action.type) {
// 		case ShoppingListActions.ADD_INGREDIENT:
// 			return {
// 				...state,
// 				ingredients: [...state.ingredients, action.payload],
// 			};
// 		case ShoppingListActions.ADD_INGREDIENTS:
// 			return {
// 				...state,
// 				ingredients: [...state.ingredients, ...action.payload],
// 			};
// 		case ShoppingListActions.UPDATE_INGREDIENT:
// 			// const ingredient = state.ingredients[stat];
// 			const updatedIngredient = {
// 				...state.edittedIng,
// 				...action.payload,
// 			};
// 			const updatedIngredients = [...state.ingredients];
// 			updatedIngredients[state.editIngIndex] = updatedIngredient;
// 			return {
// 				...state,
// 				ingredients: updatedIngredients,
// 				edittedIng: null as Ingredient,
// 				editIngIndex: -1,
// 			};
// 		case ShoppingListActions.DELETE_INGREDIENT:
// 			return {
// 				...state,
// 				ingredients: state.ingredients.filter((ig, igIndex) => {
// 					return igIndex !== state.editIngIndex;
// 				}),
// 				edittedIng: null as Ingredient,
// 				editIngIndex: -1,
// 			};
// 		case ShoppingListActions.START_EDIT:
// 			return {
// 				...state,
// 				edittedIng: { ...state.ingredients[action.payload] },
// 				editIngIndex: action.payload,
// 			};
// 		case ShoppingListActions.STOP_EDIT:
// 			return {
// 				...state,
// 				edittedIng: null as Ingredient,
// 				editIngIndex: -1,
// 			};
// 		default:
// 			return state;
// 	}
// }

export const ShoppingListReducer = createReducer(
	initialState,
	on(ShoppingListActions.AddIngredient, (state, action) => ({
		...state,
		ingredients: [...state.ingredients, action],
	})),
	on(ShoppingListActions.AddIngredients, (state, { ingredients }) => ({
		...state,
		ingredients: [...state.ingredients, ...ingredients],
	})),
	on(ShoppingListActions.UpdateIngredient, (state, action) => {
		const updatedIngredient = {
			...state.edittedIng,
			...action,
		};
		const updatedIngredients = [...state.ingredients];
		updatedIngredients[state.editIngIndex] = updatedIngredient;
		return {
			...state,
			ingredients: updatedIngredients,
			edittedIng: null,
			editIngIndex: -1,
		};
	}),
	on(ShoppingListActions.DeleteIngredients, (state) => ({
		...state,
		ingredients: state.ingredients.filter((ig, igIndex) => {
			return igIndex !== state.editIngIndex;
		}),
		edittedIng: null as Ingredient,
		editIngIndex: -1,
	})),
	on(ShoppingListActions.StartEdit, (state, { editInd }) => ({
		...state,
		edittedIng: { ...state.ingredients[editInd] },
		editIngIndex: editInd,
	})),
	on(ShoppingListActions.StopEdit, (state) => ({
		...state,
		edittedIng: null as Ingredient,
		editIngIndex: -1,
	}))
);
