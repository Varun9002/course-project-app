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
  private igchangedsubs?: Subscription;
  constructor(private shoppinglistService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppinglistService.getIngredient();
    this.igchangedsubs=this.shoppinglistService.ingUdated.subscribe((ing: Ingredient[]) => {
      this.ingredients = ing;
    });
  }
  ngOnDestroy(): void {
    this.igchangedsubs?.unsubscribe();
  }

}
