import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
	user: User;
	isLoading: boolean;
	authError: string;
}

const initialState: State = {
	user: null,
	isLoading: false,
	authError: null,
};
//OLD SYNTAX
// export function AuthReducer(
// 	state = initialState,
// 	action:
// ): State {
// 	switch (action.type) {
// 		case AuthActions.LOGIN:
// 			return {
// 				...state,
// 				user: new User(
// 					action.payload.email,
// 					action.payload.id,
// 					action.payload.token,
// 					action.payload.expirationDate
// 				),
// 				isLoading: false,
// 				error: null,
//             };
//         case AuthActions.LOGIN_START:
//             re
// 		case AuthActions.LOGOUT:
// 			return {
// 				...state,
// 				user: null,
// 			};
// 		default:
// 			return state;
// 	}
// }

export const AuthReducer = createReducer(
	initialState,
	on(AuthActions.AuthenticateSuccess, (state, action) => ({
		...state,
		user: new User(
			action.email,
			action.id,
			action.token,
			action.expirationDate
		),
		isLoading: false,
		authError: null,
	})),
	on(AuthActions.Logout, (state) => ({ ...state, user: null })),
	on(AuthActions.LoginStart, (state, action) => ({
		...state,
		isLoading: true,
		authError: null,
	})),
	on(AuthActions.AuthenticateFail, (state, action) => ({
		...state,
		user: null,
		isLoading: false,
		authError: action.error,
	})),
	on(AuthActions.SignupStart, (state, action) => ({
		...state,
		isLoading: true,
		authError: null,
	})),
	on(AuthActions.ClearError, (state) => ({ ...state, authError: null }))
);
