import {
	Component,
	ElementRef,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	@Output() ingredientAdded = new EventEmitter<Ingredient>();

	@ViewChild('f', { static: true }) form!: NgForm;
	subs!: Subscription;
	editMode = false;
	constructor(private store: Store<fromApp.AppState>) {}

	ngOnInit(): void {
		this.subs = this.store.select('shoppingList').subscribe((stateData) => {
			if (stateData.editIngIndex > -1) {
				this.editMode = true;
				const edittedItem = stateData.edittedIng;
				this.form.setValue({
					name: edittedItem.name,
					amount: edittedItem.amount,
				});
			} else {
				this.editMode = false;
			}
		});
	}
	onSubmit() {
		const newIng = new Ingredient(
			this.form.value.name,
			this.form.value.amount
		);
		if (this.editMode) {
			this.store.dispatch(ShoppingListActions.UpdateIngredient(newIng));
		} else {
			this.store.dispatch(ShoppingListActions.AddIngredient(newIng));
		}
		this.onClear();
	}
	onDelete() {
		if (this.editMode) {
			this.store.dispatch(ShoppingListActions.DeleteIngredients());
			this.onClear();
		}
	}
	onClear() {
		this.editMode = false;
		this.form.reset();
		this.store.dispatch(ShoppingListActions.StopEdit());
	}

	ngOnDestroy(): void {
		this.subs?.unsubscribe();
		this.store.dispatch(ShoppingListActions.StopEdit());
	}
}
