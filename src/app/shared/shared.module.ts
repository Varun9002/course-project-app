import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loadingspinner.component';
import { PlaceHolderDirective } from './placeholder.directive';

@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceHolderDirective,
  ],
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceHolderDirective,
  ],
  providers: [],
})
export class SharedModule {}
