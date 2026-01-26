import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeService } from '../services/home.service';
import { User } from '../../core/models/User';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RouterOutlet, RouterLink]
})
export class HomeComponent implements OnInit {

  private homeService = inject(HomeService)
  private router = inject(Router)
  private authService = inject(AuthService)

  constructor() { }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();

  }

}
