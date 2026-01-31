import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { UsersService } from '../services/users.service';
import { Card, CardTable } from '../../core/models/Card';
import { User } from '../../core/models/User';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { CardsService } from '../services/cards.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
})
export class UserComponent implements OnInit {
  myCards: Card[] | undefined;
  user!: User

  showAddCard = false;
  userForm!: FormGroup;
  cardForm!: FormGroup;
  hidePassword = false;
  #authService = inject(AuthService);
  #usersService = inject(UsersService)
  #cardsService = inject(CardsService)
  #toastr = inject(ToastrService)
  #route = inject(ActivatedRoute);
  #fb = inject(FormBuilder)


  ngOnInit(): void {
     this.#route.queryParams.subscribe(params => {
    if (params['user']) {
      const user = JSON.parse(params['user']);
      this.user = user;
    }
  });
    this.userForm = this.#fb.group({
      name: [this.user.name, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmitUser() {
    if (this.userForm.valid) {
       this.#usersService.patchUsers(this.userForm.value, this.user.id.toString()).subscribe({
          next: (res: User) => {
            this.#toastr.success('Usuário Editado com sucesso!', 'Sucesso');
            this.user = res;
          },
          error: err => {
            this.#toastr.error('Error ao editar usuários!', 'Erro');
          }
        })
      this.userForm.reset();
    }
  }

  logout() {
    this.#authService.logout();
  }

    toggleStatus(card: any) {
      card.status = !card.status;
      if(!card?.id)return
        this.#cardsService.patchCards(card.id).subscribe({
            next: res => {
              this.#toastr.success('Status editado com sucesso!', 'Sucesso');
            },
            error: err => {
              this.#toastr.error('Error ao editar status!', 'Erro');
            }
          })
    }

}
