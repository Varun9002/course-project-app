import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.action';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	private userSub!: Subscription;
	isAuthenticated = false;
	collapse: boolean = false;
	constructor(private store: Store<fromApp.AppState>) {}
	ngOnInit() {
		this.userSub = this.store
			.select('auth')
			.pipe(map((authData) => authData.user))
			.subscribe((user) => {
				this.isAuthenticated = !!user;
			});
	}
	onSaveData() {
		this.store.dispatch(RecipeActions.StoreRecipes());
	}
	onFetchData() {
		this.store.dispatch(RecipeActions.FetchRecipes());
	}
	onLogout() {
		this.store.dispatch(AuthActions.Logout());
	}

	onCollapse() {
		this.collapse = !this.collapse;
	}
	ngOnDestroy() {
		this.userSub.unsubscribe;
	}
}
