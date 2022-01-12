import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  recipeActive = true;
  @Output() featureSelected =  new EventEmitter<boolean>()
  constructor() { }

  onSelect(link:string) {
    if (link === 'recipe')
      this.recipeActive = true;
    else
      this.recipeActive = false;
    this.featureSelected.emit(this.recipeActive);
  }
  ngOnInit(): void {
  }

}
