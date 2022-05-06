import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: Recipe[] = []
  recSubs!: Subscription;
  
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.recSubs = this.recipeService.recipeUpdated.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();

  }
  ngOnDestroy() {
    this.recSubs.unsubscribe();
  }
}
