import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-status',
  templateUrl: './table-status.component.html',
  styleUrls: ['./table-status.component.scss'],
  imports:[CommonModule, ]
})
export class TableStatusComponent implements OnInit {

  totalCards = 0

  constructor() { }

  ngOnInit() {
  }

  filteredCards() {
    return [{name:'teste',type:'ESTUDANTE',status: 'active',}]
  }

  toggleStatus(card: unknown) {

  }

}
