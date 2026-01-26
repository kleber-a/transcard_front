import { Component, inject, OnInit, signal } from '@angular/core';
import { Card, CardFilters, CardTable } from '../../../../core/models/Card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableCardsComponent } from '../../../../shared/table-cards/table-cards.component';
import { CardsService } from '../../../services/cards.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  imports: [CommonModule, FormsModule, TableCardsComponent]
})
export class CardsComponent implements OnInit {

  #cardService = inject(CardsService)

  cards: CardTable[] = [];
  filterName = '';
  filterType = '';
  filterStatus:  boolean = true;
  page = 0;
  size = 5;
  totalPages = 0

  public isLoading = signal(false);


  ngOnInit() {
    console.warn('aqui')
    this.getDataCards();
  }

  getDataCards(filters: CardFilters = {}) {
    const {
      page = this.page,
      size = this.size,
      name,
      typeCard,
      status
    } = filters;
    console.log('aquiui')
    this.#cardService.getCards({
      page,
      size,
      name,
      typeCard,
      status
    }).pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res: any) => {
          this.cards = res.content;
          this.totalPages = res.totalPages
          console.log('this.cards', this.cards)
        },
        error: err => {
          console.log('error', err)
        }
      })
  }

  onFilterChange() {

    this.getDataCards({
      page: this.page,
      name: this.filterName || undefined,
      typeCard: this.filterType || undefined,
      status: this.filterStatus
    });
  }

  onPageChange(page: number) {
    this.page = page;
    this.getDataCards({
      page: this.page,
      name: this.filterName || undefined,
      typeCard: this.filterType || undefined,
      status: this.filterStatus
    });
  }


}
