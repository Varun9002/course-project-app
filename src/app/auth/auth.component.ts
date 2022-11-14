import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder.directive';
import { AuthService } from './auth.service';
import * as AuthActions from './store/auth.actions';
import * as fromApp from '../store/app.reducer';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy, OnInit {
	isLoginMode: boolean = true;
	isloading = false;
	error: string = null;
	@ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
	closeSub: Subscription;
	storeSub: Subscription;

	constructor(private store: Store<fromApp.AppState>) {}
	ngOnInit(): void {
		this.storeSub = this.store.select('auth').subscribe((authState) => {
			this.isloading = authState.isLoading;

			this.error = authState.authError;
			if (this.error) {
				this.showErrorAlert(this.error);
			}
		});
	}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit(form: NgForm) {
		if (!form.valid) {
			return;
		}
		const email = form.value.email;
		const password = form.value.password;
		if (this.isLoginMode) {
			this.store.dispatch(AuthActions.LoginStart({ email, password }));
		} else {
			this.store.dispatch(AuthActions.SignupStart({ email, password }));
		}
		form.reset();
	}
	onHandleError() {
		this.store.dispatch(AuthActions.ClearError());
	}

	private showErrorAlert(message: string) {
		// const alertCmpfactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
		const hostViewContainerRef = this.alertHost.viewContainerRef;
		hostViewContainerRef.clear();
		const componentRef =
			hostViewContainerRef.createComponent(AlertComponent);
		componentRef.instance.message = message;
		this.closeSub = componentRef.instance.close.subscribe(() => {
			hostViewContainerRef.clear();
		});
	}
	ngOnDestroy(): void {
		if (this.closeSub) {
			this.closeSub.unsubscribe();
		}
		if (this.storeSub) {
			this.storeSub.unsubscribe();
		}
	}
}
