import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
	ingredients: Observable<fromShoppingList.State>;
	constructor(private store: Store<fromApp.AppState>) {}

	ngOnInit(): void {
		this.ingredients = this.store.select('shoppingList');
	}

	onEditItem(i: number) {
		this.store.dispatch(ShoppingListActions.StartEdit({ editInd: i }));
	}

	ngOnDestroy(): void {}
}
