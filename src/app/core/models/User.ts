import { Card } from "./Card";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  cards: Card[];
}
