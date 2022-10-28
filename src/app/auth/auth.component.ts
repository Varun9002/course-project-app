import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable ,Subscription} from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder.directive';
import { AuthService , AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true;
  isloading = false;
  error: string = null;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
  closeSub: Subscription;


  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isloading = true;
    const email = form.value.email;
    const password = form.value.password;

    let authObs!: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObs = this.authService.signin(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe({
      next: (response) => {
        this.isloading = false;
        this.router.navigate(['/recipes'])
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isloading = false;
      },
    });
    form.reset();
  }
  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    // const alertCmpfactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);      
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
