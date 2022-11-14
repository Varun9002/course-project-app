import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;
}

const handleAuthentication = (
	expiresIn: string,
	email: string,
	localId: string,
	idToken: string
) => {
	const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
	const user = new User(email, localId, idToken, expirationDate);
	localStorage.setItem('userData', JSON.stringify(user));
	return AuthActions.AuthenticateSuccess({
		email: user.email,
		id: user.id,
		token: user.token,
		expirationDate: expirationDate,
		redirect: true,
	});
};
const handleError = (errorRes: HttpErrorResponse) => {
	let error = 'An unknown error Occured';
	if (!errorRes.error || !errorRes.error.error) {
		return of(AuthActions.AuthenticateFail({ error }));
	}
	switch (errorRes.error.error.message) {
		case 'EMAIL_EXISTS':
			error = 'This email already exists';
			break;
		case 'EMAIL_NOT_FOUND':
			error = 'This email doesnot exists';
			break;
		case 'INVALID_PASSWORD':
			error = 'This password is not correct';
	}
	return of(AuthActions.AuthenticateFail({ error }));
};

@Injectable()
export class AuthEffects {
	authLogin$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActions.LoginStart),
			switchMap((authData) => {
				return this.http
					.post<AuthResponseData>(
						'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
							environment.firebaseAPIKey,
						{
							email: authData.email,
							password: authData.password,
							returnSecureToken: true,
						}
					)
					.pipe(
						tap((resData) => {
							this.authService.setLogiutTimer(
								+resData.expiresIn * 1000
							);
						}),
						map((resData) =>
							handleAuthentication(
								resData.expiresIn,
								resData.email,
								resData.localId,
								resData.idToken
							)
						),
						catchError((errorRes: HttpErrorResponse) =>
							handleError(errorRes)
						)
					);
			})
		);
	});
	authSignup$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActions.SignupStart),
			switchMap((authData) => {
				return this.http
					.post<AuthResponseData>(
						'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
							environment.firebaseAPIKey,
						{
							email: authData.email,
							password: authData.password,
							returnSecureToken: true,
						}
					)
					.pipe(
						tap((resData) => {
							this.authService.setLogiutTimer(
								+resData.expiresIn * 1000
							);
						}),
						map((resData) =>
							handleAuthentication(
								resData.expiresIn,
								resData.email,
								resData.localId,
								resData.idToken
							)
						),
						catchError((errorRes: HttpErrorResponse) =>
							handleError(errorRes)
						)
					);
			})
		);
	});
	authRedirect$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(AuthActions.AuthenticateSuccess),
				tap((authData) => {
					if (authData.redirect) {
						this.router.navigate(['/']);
					}
				})
			);
		},
		{ dispatch: false }
	);
	authLogout$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(AuthActions.Logout),
				tap(() => {
					this.authService.clearLogoutTimer();
					localStorage.removeItem('userData');
					this.router.navigate(['/auth']);
				})
			);
		},
		{ dispatch: false }
	);
	authAutoLogin$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActions.AutoLogin),
			map(() => {
				const userData: {
					email: string;
					id: string;
					_token: string;
					_tokenExpirationDate: string;
				} = JSON.parse(localStorage.getItem('userData'));
				if (!userData) {
					return { type: 'dummy' };
				}
				const loadedUser = new User(
					userData.email,
					userData.id,
					userData._token,
					new Date(userData._tokenExpirationDate)
				);
				if (loadedUser.token) {
					const expDuration =
						new Date(userData._tokenExpirationDate).getTime() -
						new Date().getTime();
					this.authService.setLogiutTimer(expDuration);
					return AuthActions.AuthenticateSuccess({
						email: userData.email,
						id: userData.id,
						token: userData._token,
						expirationDate: new Date(userData._tokenExpirationDate),
						redirect: false,
					});
				}
				return { type: 'dummy' };
			})
		);
	});
	constructor(
		private actions$: Actions,
		private http: HttpClient,
		private router: Router,
		private authService: AuthService
	) {}
}
