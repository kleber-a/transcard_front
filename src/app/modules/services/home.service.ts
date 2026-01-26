import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { Observable } from 'rxjs';
import { User } from '../../core/models/User';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  #httpService = inject(HttpService);

  private readonly users = 'users'


  getUsers(): Observable<User[]> {
    return this.#httpService.getGeneric<User[]>(this.users)
  }

}
