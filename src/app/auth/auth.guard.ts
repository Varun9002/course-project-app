import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { AuthService } from './auth.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router,
		private store: Store<fromApp.AppState>
	) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| boolean
		| UrlTree
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree> {
		return this.store.select('auth').pipe(
			take(1),
			map((user) => {
				const isAuth = !!user.user;
				if (isAuth) {
					return true;
				}
				return this.router.createUrlTree(['/auth']);
			})
		);
	}
}
