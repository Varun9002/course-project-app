import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
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
  recForm!: UntypedFormGroup;

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
    let recIngredients= new UntypedFormArray([]);
    if (this.editmode) {
      let recipe = this.recipeService.getRecipe(this.id);
      recName = recipe.name;
      recImagePath = recipe.imagePath;
      recDescription = recipe.description;
      if (recipe['ingredients']) {
        for (const ing of recipe.ingredients) {
          recIngredients.push(new UntypedFormGroup({
            'name': new UntypedFormControl(ing.name,Validators.required),
            'amount': new UntypedFormControl(ing.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }        
      }
    }
    this.recForm = new UntypedFormGroup({
      'name': new UntypedFormControl(recName,Validators.required),
      'imagePath': new UntypedFormControl(recImagePath,Validators.required),
      'description': new UntypedFormControl(recDescription,Validators.required),
      'ingredients': recIngredients
    })
  }

  onAddIngredient() {
    (<UntypedFormArray>this.recForm.get('ingredients')).push(new UntypedFormGroup({
      'name': new UntypedFormControl(null,Validators.required),
      'amount': new UntypedFormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]) 
    }))
  }

  getIngCtrls() {
    return (<UntypedFormArray>this.recForm.get('ingredients')).controls.slice();
  }

  onDeleteIng(index: number) {
    (<UntypedFormArray>this.recForm.get('ingredients')).removeAt(index);
  }
}
