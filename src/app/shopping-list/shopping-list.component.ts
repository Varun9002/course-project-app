import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients: Ingredient[] = [];
  private igchangedsubs!: Subscription
  private editIndexSub!: Subscription;
  editIndex: number = -1;
  constructor(private shoppinglistService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppinglistService.getIngredients();
    this.igchangedsubs=this.shoppinglistService.ingUdated.subscribe((ing: Ingredient[]) => {
      this.ingredients = ing;
    });
    this.editIndexSub = this.shoppinglistService.editIndex.subscribe((index: number) => {
      this.editIndex = index;
    })
  }

  onEditItem(i:number) {
    this.shoppinglistService.startedEditting.next(i);
    this.editIndex = i;
  }


  ngOnDestroy(): void {
    this.igchangedsubs?.unsubscribe();
    this.editIndexSub.unsubscribe();
  }

}
