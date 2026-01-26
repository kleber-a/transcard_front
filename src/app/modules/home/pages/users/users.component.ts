import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserCardModalComponent } from '../../../../shared/user-card-modal/user-card-modal.component';
import { User } from '../../../../core/models/User';
import { UsersService } from '../../../services/users.service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserModalComponent } from '../../../../shared/create-user-modal/create-user-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [CommonModule, UserCardModalComponent, FormsModule]
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedUser?: User;
  isAddCardModalOpen = false;

  #usersService = inject(UsersService);
  #dialog = inject(MatDialog)
  #toastr = inject(ToastrService)
  searchName = ''

  ngOnInit(): void {

    this.setUsers();

  }

  setUsers(name?: string) {
    this.#usersService.getUsers(name).subscribe({
      next: (users: User[]) => {
        this.users = users
      },
      error: err => {
        this.#toastr.error('Error ao listar usuários!', 'Erro');
      }
    })
  }

  onSearch() {
    // this.searchSubject.next(value);
    this.setUsers(this.searchName)
  }

  openCreateUser() {
    // this.selectedUser = user;

    const dialogRef = this.#dialog.open(CreateUserModalComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('result',result)
        this.addCard(result);
      }
      this.selectedUser = undefined;
    });
  }

  openAddCardModal(user: User) {
    console.log('user',user)
    this.selectedUser = user;
    this.isAddCardModalOpen = true;
  }

  addCard(card: any) {
     this.#usersService.postUsers(card).subscribe({
      next: res => {
        this.#toastr.success('Usuário criado!', 'Sucesso');
        this.setUsers();
      },
      error: err => {
        this.#toastr.error('Error ao criar usuário!', 'Erro');
      }
    })
  }

  deleteUser(id: string | number){
    this.#usersService.deleteUser(id).subscribe({
       next: res => {
        this.#toastr.success('Usuário deletado!', 'Sucesso');
        this.setUsers();
      },
      error: err => {
        this.#toastr.error('Error ao deletar usuário!', 'Erro');
      }
    })
  }

}
