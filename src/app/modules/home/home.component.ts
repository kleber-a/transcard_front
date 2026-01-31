import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeService } from '../services/home.service';
import { User } from '../../core/models/User';
import { AuthService } from '../../core/services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterOutlet, RouterLink, MatIconModule]
})
export class HomeComponent implements OnInit {

  #authService = inject(AuthService)

  currentRoute: string = 'users';

  toggleMenu = false;

  constructor() { }

  ngOnInit() {

  }
  selectRoute(route: string) {
    this.currentRoute = route;
  }

  logout() {
    this.#authService.logout();
  }

}
