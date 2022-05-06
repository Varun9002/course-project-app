import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editmode = false;
  recForm!: FormGroup;

  constructor(private route: ActivatedRoute,private recipeService: RecipeService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editmode = params['id'] != null;
      this.initForm();
    });
    
  }

  onSubmit() {
    // const newRecipe = new Recipe(this.recForm.value['name'],
    //   this.recForm.value['description'],
    //   this.recForm.value['imagePath'],
    //   this.recForm.value['ingredients']);
    // console.log(this.recForm.value);
    
    if (this.editmode) {
      this.recipeService.updateRecipe(this.id, this.recForm.value);
    }
    else {
      this.recipeService.addRecipe(this.recForm.value); 
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
  private initForm() {
    let recName = '';
    let recImagePath = '';
    let recDescription = '';
    let recIngredients= new FormArray([]);
    if (this.editmode) {
      let recipe = this.recipeService.getRecipe(this.id);
      recName = recipe.name;
      recImagePath = recipe.imagePath;
      recDescription = recipe.description;
      if (recipe['ingredients']) {
        for (const ing of recipe.ingredients) {
          recIngredients.push(new FormGroup({
            'name': new FormControl(ing.name,Validators.required),
            'amount': new FormControl(ing.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }        
      }
    }
    this.recForm = new FormGroup({
      'name': new FormControl(recName,Validators.required),
      'imagePath': new FormControl(recImagePath,Validators.required),
      'description': new FormControl(recDescription,Validators.required),
      'ingredients': recIngredients
    })
  }

  onAddIngredient() {
    (<FormArray>this.recForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null,Validators.required),
      'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]) 
    }))
  }

  getIngCtrls() {
    return (<FormArray>this.recForm.get('ingredients')).controls.slice();
  }

  onDeleteIng(index: number) {
    (<FormArray>this.recForm.get('ingredients')).removeAt(index);
  }
}
