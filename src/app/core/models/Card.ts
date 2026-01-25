export type CardType = 'COMUM' | 'ESTUDANTE' | 'TRABALHADOR';

export interface Card {
  id: number;
  number: string;
  name: string;
  type: CardType;
  status: boolean;
  userId: number;
}
