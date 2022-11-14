import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipe from '../recipes/store/recipe.reducer';

export interface AppState {
	shoppingList: fromShoppingList.State;
	auth: fromAuth.State;
	recipe: fromRecipe.State;
}

export const appReducers = {
	shoppingList: fromShoppingList.ShoppingListReducer,
	auth: fromAuth.AuthReducer,
	recipe: fromRecipe.RecipeReducer,
};
