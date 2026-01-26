import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CardTable } from '../../core/models/Card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CardsService } from '../../modules/services/cards.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table-cards',
  templateUrl: './table-cards.component.html',
  styleUrls: ['./table-cards.component.scss'],
  imports: [CommonModule, MatIconModule]
})
export class TableCardsComponent implements OnChanges {

  @Input() cards: CardTable[] = [];
  @Input() paginaAtual = 1;
  @Input() totalPages = 0;

  @Output() changePage = new EventEmitter<number>();

  #cardsService = inject(CardsService);
  #toastr = inject(ToastrService)


  // Lógica simples de paginação
  // totalItens = 15;
  // paginaAtual = 1;

  // ngOnInit(): void {
  //   console.log('cards',this.cards)

  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cards']) {
      console.log('cards atualizados:', this.cards);
    }
  }

  goToPage(page: number) {
    if (page < 0 || page >= this.totalPages) return;
    this.changePage.emit(page);
  }

  nextPage() {
    this.goToPage(this.paginaAtual + 1);
  }

  prevPage() {
    this.goToPage(this.paginaAtual - 1);
  }

  pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }



   getBadgeClass(valor: string): string {
    const base = 'px-3 py-1 rounded-full text-xs font-medium ';
    const cores: Record<string, string> = {
      'TRABALHADOR': 'bg-green-900/20 text-green-500',
      'COMUM': 'bg-gray-800 text-gray-400',
      'ESTUDANTE': 'bg-blue-900/20 text-cyan-500',
      'ATIVO': 'bg-green-900/20 text-green-400',
      'INATIVO': 'bg-gray-800 text-gray-500',
    };
    return base + (cores[valor] || '');
  }

  getBadgeClassStatus(status: boolean){
     const base = 'px-3 py-1 rounded-full text-xs font-medium ';
    const cores =  status ? 'bg-green-900/20 text-green-400' : 'bg-gray-800 text-gray-500'
    return base + (cores || '');
  }

  getLabelStatus(status: boolean){
    return status ? 'Ativo' : 'Inativo'
  }

  toggleStatus(card: CardTable) {
    card.status = !card.status;

    if(!card?.id)return

      this.#cardsService.patchCards(card.id).subscribe({
          next: res => {
            this.#toastr.success('Status editado com sucesso!', 'Sucesso');
            // this.update.emit();

          },
          error: err => {
            this.#toastr.error('Error ao editar status!', 'Erro');
          }
        })
  }
}
