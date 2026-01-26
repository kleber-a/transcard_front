export type CardType = 'COMUM' | 'ESTUDANTE' | 'TRABALHADOR';

export interface Card {
  id: number;
  numberCard: string;
  fullName: string;
  typeCard: CardType;
  status: boolean;
  userId: number;
}


export interface CardTable {
  id?: number;
  numberCard: string;
  fullName: string;
  userName: string;
  typeCard: 'TRABALHADOR' | 'COMUM' | 'ESTUDANTE';
  status: boolean;
}


export interface CardFilters {
  page?: number;
  size?: number;
  name?: string;
  typeCard?: string;
  status?: boolean;
}
