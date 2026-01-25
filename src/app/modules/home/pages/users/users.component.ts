import { Component, OnInit } from '@angular/core';
import { AddCardModalComponent } from '../../../../shared/add-card-modal/add-card-modal.component';
import { User } from '../../../../core/models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [AddCardModalComponent]
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedUser?: User;
  isAddCardModalOpen = false;

  // constructor(private dataService: DataService) {
  //   this.users = this.dataService.getUsers();
  // }

  ngOnInit(): void {

  }

  openAddCardModal(user: User) {
    this.selectedUser = user;
    this.isAddCardModalOpen = true;
  }

  addCard(card: any) {
    if (!this.selectedUser) return;
    card.userId = this.selectedUser.id;
    // this.dataService.addCard(card);
    this.isAddCardModalOpen = false;
    this.selectedUser = undefined;
    // this.users = this.dataService.getUsers();
  }

}
