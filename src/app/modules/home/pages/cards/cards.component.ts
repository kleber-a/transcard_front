import { Component, OnInit } from '@angular/core';
import { Card } from '../../../../core/models/Card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class CardsComponent implements OnInit {

  users = [{name:'',email: '', cards: []}]
  cards: Card[] = [];
  filterType = '';
  filterStatus = '';

  // constructor(private dataService: DataService) {
    // this.cards = this.dataService.getCards();
  // }

    ngOnInit() {
  }

  filteredCards(): Card[] {
    return this.cards.filter(card =>
      (!this.filterType || card.type === this.filterType) &&
      (!this.filterStatus || card.status.toString() === this.filterStatus)
    );
  }

  toggleStatus(card: Card) {
    // this.dataService.toggleCardStatus(card);
    // this.cards = this.dataService.getCards();
  }
openAddCardModal(event: unknown){

}
  get totalCards() { return this.cards.length; }
  get activeCards() { return this.cards.filter(c => c.status).length; }
  get inactiveCards() { return this.cards.filter(c => !c.status).length; }
  get studentCards() { return this.cards.filter(c => c.type==='ESTUDANTE').length; }

}
