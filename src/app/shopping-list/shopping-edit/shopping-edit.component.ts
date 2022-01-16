import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientAdded = new EventEmitter<Ingredient>()
  @ViewChild('nameInput', { static: true }) nameInp?: ElementRef;
  @ViewChild('amountInput', { static: true }) amountInp?: ElementRef;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
  }
  onAddItem() {
    this.shoppingListService.addIngredient(new Ingredient(this.nameInp?.nativeElement.value,this.amountInp?.nativeElement.value))
  }

}
