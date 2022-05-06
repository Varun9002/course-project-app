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
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient';
import { ShoppingListService } from '../shopping-list.service';

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
  editItemIndex!: number;
  edittedItem!: Ingredient;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subs = this.shoppingListService.startedEditting.subscribe(
      (i: number) => {
        this.edittedItem = this.shoppingListService.getIngredient(i);
        this.editItemIndex = i;
        this.shoppingListService.editIndex.next(this.editItemIndex);
        this.editMode = true;
        this.form.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount,
        });
      }
    );
  }
  onSubmit() {
    // this.shoppingListService.addIngredient(new Ingredient(this.nameInp?.nativeElement.value,this.amountInp?.nativeElement.value))
    const newIng = new Ingredient(this.form.value.name, this.form.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, newIng);
    } else {
      this.shoppingListService.addIngredient(newIng);
    }
    this.onClear();
  }
  onDelete() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editItemIndex);
      this.onClear()
    }
  }
  onClear() {
    this.editMode = false;
    this.editItemIndex = -1;
    this.shoppingListService.editIndex.next(this.editItemIndex);
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
