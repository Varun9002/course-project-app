import { createAction, props } from '@ngrx/store';

//OLD SyntaX
// export const LOGIN = '[Auth] Login';
// export const LOGIN_START = '[Auth] Login Start';
// export const LOGIN_FAIL = '[Auth] Login Fail';
// export const LOGOUT = '[Auth] LOGOUT';

// export class Login implements Action {
// 	readonly type = LOGIN;
// 	constructor(
// 		public payload: {
// 			email: string,
// 			id: string,
// 			token: string,
// 			expirationDate: Date,
// 		}
// 	) {}
// }
// export class LoginFail implements Action{

// }
// export class LoginStart implements Action {
// 	readonly type = LOGIN_START;
// 	constructor(public payload: { email: string; password: string }) {}
// }

// export class Logout implements Action {
// 	readonly type = LOGOUT;
// }

// export type AuthActions = Login | Logout | LoginStart | LoginFail;
export const AuthenticateSuccess = createAction(
	'[Auth] Authenticate Success',
	props<{
		email: string;
		id: string;
		token: string;
		expirationDate: Date;
		redirect: boolean;
	}>()
);
export const Logout = createAction('[Auth] Logout');

export const AuthenticateFail = createAction(
	'[Auth] Authenticate Fail Fail',
	props<{ error: string }>()
);

export const LoginStart = createAction(
	'[Auth] Login Start',
	props<{ email: string; password: string }>()
);

export const AutoLogin = createAction('[Auth] Auto Login');

export const SignupStart = createAction(
	'[Auth] Signup Start',
	props<{ email: string; password: string }>()
);

export const ClearError = createAction('[Auth] Clear Error');
