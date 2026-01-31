import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { UserCardModalComponent } from '../../../../shared/user-card-modal/user-card-modal.component';
import { PageUser, User, UserFilters } from '../../../../core/models/User';
import { UsersService } from '../../../services/users.service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserModalComponent } from '../../../../shared/create-user-modal/create-user-modal.component';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

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
  page = 0;
  size = 10;
  totalPages = 0
  public isLoading = signal(false);

  #usersService = inject(UsersService);
  #dialog = inject(MatDialog)
  #toastr = inject(ToastrService)
  searchName = ''

  ngOnInit(): void {

    this.setUsers();

  }

  setUsers(filters: UserFilters = {}) {
    const {
      page = this.page,
      size = this.size,
      name,
    } = filters;


  this.#usersService.getUsers({
    page,
    size,
    name,
  }).pipe(finalize(() => this.isLoading.set(false)))
    .subscribe({
      next: (res: PageUser) => {
        this.users = res.content;
        this.totalPages = res.totalPages
      },
      error: err => {
        this.#toastr.error('Error ao listar usuários!', 'Erro');
      }
    })

  }

  onSearch() {
    this.setUsers({
      page: this.page,
      name: this.searchName || undefined
    })
  }

  openCreateUser() {
    const dialogRef = this.#dialog.open(CreateUserModalComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCard(result);
      }
      this.selectedUser = undefined;
    });
  }

  openAddCardModal(user: User) {
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
        this.#toastr.error(err.error.message, 'Erro');
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

  onPageChange(page: number) {
    this.page = page;
    this.setUsers({
      page: this.page,
      name: this.searchName || undefined,
    });
  }

}
