import { Card } from "./Card";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  cards?: Card[];

  isCardsOpen?: boolean;
}


export interface PageUser {
  // page.t
  content: User[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}



export interface UserFilters {
  page?: number;
  size?: number;
  name?: string;
}
