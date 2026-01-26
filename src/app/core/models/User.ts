import { Card } from "./Card";

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  cards?: Card[];

  isCardsOpen?: boolean;
}
