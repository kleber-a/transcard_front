import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { Card } from '../../core/models/Card';
import { User } from '../../core/models/User';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

 #httpService = inject(HttpService);

  private readonly cards = 'cards'


  getCards(query?: any) {
    console.log('query',query)
    let params: any = {};

    if (query?.name) {
      params.name = query.name;
    }

    if (query?.typeCard) {
      params.typeCard = query.typeCard;
    }

    if (query?.status) {
      params.status = query.status;
    }

    if (query?.page || query?.page === 0) {
      params.page = query.page;
    }

    if (query?.size) {
      params.size = query.size;
    }


    return this.#httpService.getGeneric(this.cards, params);
  }

  postCards(userId: string | number,card: Card){
    console.log('userId',userId)
    console.log('card',card)
    const endpoint = `${this.cards}/${userId}`

    return this.#httpService.postGeneric(endpoint, card)
  }

  patchCards(idCard: string | number) {
    const endpoint = `${this.cards}/${idCard}/toggle`
    return this.#httpService.patchGeneric(endpoint)

  }


  deleteCards(id: string | number){
    const endpoint = `${this.cards}/${id}`
    return this.#httpService.deleteGeneric(endpoint)
  }

  // putCards(user: User, id?: string) {
  //   const endpoint = `${this.users}/${id}`
  //   return this.#httpService.putGeneric(endpoint, user)
  // }

}
