import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private tknExpTimer: any;
	constructor(private store: Store<fromApp.AppState>) {}

	setLogiutTimer(expDuration: number) {
		this.tknExpTimer = setTimeout(() => {
			this.store.dispatch(AuthActions.Logout());
		}, expDuration);
	}
	clearLogoutTimer() {
		if (this.tknExpTimer) {
			clearTimeout(this.tknExpTimer);
			this.tknExpTimer = null;
		}
	}
}
