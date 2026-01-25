import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { UsersComponent } from "./pages/users/users.component";
import { CardsComponent } from "./pages/cards/cards.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'users' },
      { path: 'users', component: UsersComponent },
      { path: 'cards', component: CardsComponent },
    ]
  },
];
