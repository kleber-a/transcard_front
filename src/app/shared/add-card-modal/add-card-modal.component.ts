import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../core/models/User';
import { Card } from '../../core/models/Card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-card-modal',
  templateUrl: './add-card-modal.component.html',
  styleUrls: ['./add-card-modal.component.scss'],
  imports: [FormsModule]
})
export class AddCardModalComponent implements OnInit {

  @Input() user?: User;
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() onAddCard = new EventEmitter<Card>();

  constructor() { }

  ngOnInit() {
  }

  card: any = { number: '', name: '', type: 'COMUM' };

  addCard() {
    this.onAddCard.emit(this.card);
    this.card = { number: '', name: '', type: 'COMUM' };
  }

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }


}
