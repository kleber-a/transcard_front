import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { Observable } from 'rxjs';
import { User } from '../../core/models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 #httpService = inject(HttpService);

  private readonly users = 'users'


  getUsers(name?: string): Observable<User[]> {
    const params = name ? { name } : undefined;
    return this.#httpService.getGeneric<User[]>(this.users, params);
  }

  postUsers(user: User){
    return this.#httpService.postGeneric(this.users, user)
  }

  putUsers(user: User, id?: string) {
    const endpoint = `${this.users}/${id}`
    return this.#httpService.putGeneric(endpoint, user)
  }

  deleteUser(id: string | number){
    const endpoint = `${this.users}/${id}`
    return this.#httpService.deleteGeneric(endpoint)
  }
}
