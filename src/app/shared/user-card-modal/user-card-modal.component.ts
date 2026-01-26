import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { User } from '../../core/models/User';
import { Card } from '../../core/models/Card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';
import { UsersService } from '../../modules/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { CreateCardModalComponent } from '../create-card-modal/create-card-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { CardsService } from '../../modules/services/cards.service';

@Component({
  selector: 'app-user-card-modal',
  templateUrl: './user-card-modal.component.html',
  styleUrls: ['./user-card-modal.component.scss'],
  imports: [CommonModule, FormsModule, MatIconModule]
})
export class UserCardModalComponent implements OnInit {

  @Input() users?: User[];
  // @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() onAddCard = new EventEmitter<Card>();
  @Output() onDeleteUser = new EventEmitter<string | number>();
  @Output() update = new EventEmitter<boolean>();

  #usersService = inject(UsersService);
  #cardsService = inject(CardsService);
  #dialog = inject(MatDialog)
  #toastr = inject(ToastrService)

  constructor() { }

  ngOnInit() {
  }

  card: any = { number: '', name: '', type: 'COMUM' };

  openAddCardModal(user: User) {
    this.#dialog.open(CreateCardModalComponent, {
      width: '400px',
      disableClose: true,
      data: {
        userName: user.fullName
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log('Cartão criado:', result);
        this.#cardsService.postCards(user.id, result).subscribe({
          next: res => {
            this.#toastr.success('Cartão adicionar com sucesso!', 'Sucesso')
            this.update.emit();
          },
          error: err => {
            this.#toastr.error('Erro ao adicionar cartão', 'Erro')
          }
        })
      }
    });

  }

  close() {
    this.isOpenChange.emit();
  }

  openEditUser(user: User) {
    const dialogRef = this.#dialog.open(CreateUserModalComponent, {
      width: '400px',
      disableClose: true,
      data: {
        user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Usuário editado:', result);

        const payload: any = {
          fullName: result.fullName,
          email: result.email
        };

        if (result.password) {
          payload.password = result.password;
        }

        this.#usersService.putUsers(payload, result.id).subscribe({
          next: res => {
            this.#toastr.success('Usuário Editado com sucesso!', 'Sucesso');
            this.update.emit();

          },
          error: err => {
            this.#toastr.error('Error ao editar usuários!', 'Erro');
          }
        })

      }
    });
  }

  deleteUser(user: User) {
    this.onDeleteUser.emit(user.id)
  }

  setCardStatus(card: Card) {
    card.status = !card.status
    console.log('card',card)
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

  deleteCard(user:User, card: Card) {
    this.#cardsService.deleteCards(card.id).subscribe({
          next: res => {
            this.#toastr.success('deletado com sucesso!', 'Sucesso');
            this.update.emit();

          },
          error: err => {
            this.#toastr.error('Error ao deletar status!', 'Erro');
          }
        });
  }

}
