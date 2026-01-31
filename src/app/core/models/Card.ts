export type CardType = 'COMUM' | 'ESTUDANTE' | 'TRABALHADOR';

export interface Card {
  id: number;
  cardNumber: string;
  cardName: string;
  cardType: CardType;
  status: boolean;
  userId: number;
}


export interface CardTable {
  id?: number;
  cardNumber: number;
  cardName: string;
  user: UserCard;
  cardType: 'TRABALHADOR' | 'COMUM' | 'ESTUDANTE';
  status: boolean;
}

export interface UserCard {
  id: number;
  email: string;
  name: string;
}


export interface CardFilters {
  page?: number;
  size?: number;
  name?: string;
  typeCard?: string;
  status?: boolean;
}
