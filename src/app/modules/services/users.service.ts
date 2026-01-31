import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { Observable } from 'rxjs';
import { PageUser, User, UserFilters } from '../../core/models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 #httpService = inject(HttpService);

  private readonly users = 'users'
  private readonly userMe = 'users/me'


  getUsers(query?: UserFilters): Observable<PageUser> {
    let params: any = {};

    if (query?.name) {
      params.name = query.name;
    }

    if (query?.page || query?.page === 0) {
      params.page = query.page;
    }

    if (query?.size) {
      params.size = query.size;
    }
    return this.#httpService.getGeneric<PageUser>(this.users, params);
  }

  getMyUser(): Observable<User> {
    return this.#httpService.getGeneric<User>(this.userMe);
  }

  postUsers(user: User){
    return this.#httpService.postGeneric(this.users, user)
  }

  patchUsers(user: User, id?: string): Observable<User> {
    const endpoint = `${this.users}/${id}`
    console.warn('endpoint',endpoint)
    console.warn('user',user)
    return this.#httpService.patchGeneric<User>(endpoint, user)
  }

  deleteUser(id: string | number){
    const endpoint = `${this.users}/${id}`
    return this.#httpService.deleteGeneric(endpoint)
  }
}
