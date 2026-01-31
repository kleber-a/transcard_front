import { TestBed } from '@angular/core/testing';
import { CardsService } from './cards.service';
import { HttpService } from '../../core/services/http/http.service';
import { of } from 'rxjs';
import { Card } from '../../core/models/Card';

describe('CardsService', () => {
  let service: CardsService;
  let mockHttpService: any;

  beforeEach(() => {
    // Mock do HttpService
    mockHttpService = {
      getGeneric: jasmine.createSpy('getGeneric'),
      postGeneric: jasmine.createSpy('postGeneric'),
      patchGeneric: jasmine.createSpy('patchGeneric'),
      deleteGeneric: jasmine.createSpy('deleteGeneric')
    };

    TestBed.configureTestingModule({
      providers: [
        CardsService,
        { provide: HttpService, useValue: mockHttpService }
      ]
    });

    service = TestBed.inject(CardsService);
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar getGeneric ao obter cards com filtros', () => {
    const fakeCards: Card[] = [
      { id: 1, cardName: 'Cartão 1', status: true } as Card,
      { id: 2, cardName: 'Cartão 2', status: false } as Card
    ];

    mockHttpService.getGeneric.and.returnValue(of(fakeCards));

    service.getCards({ name: 'Cartão', page: 0, size: 10 }).subscribe(result => {
      expect(result).toEqual(fakeCards);
    });

    expect(mockHttpService.getGeneric).toHaveBeenCalledWith('cards', { name: 'Cartão', page: 0, size: 10 });
  });

  it('deve chamar postGeneric ao criar um card', () => {
    const newCard: Card = { cardName: 'Novo Cartão', status: true } as Card;
    mockHttpService.postGeneric.and.returnValue(of(newCard));

    service.postCards(1, newCard).subscribe(result => {
      expect(result).toEqual(newCard);
    });

    expect(mockHttpService.postGeneric).toHaveBeenCalledWith('cards/1', newCard);
  });

  it('deve chamar patchGeneric ao alternar status do card', () => {
    mockHttpService.patchGeneric.and.returnValue(of({ success: true }));

    service.patchCards(1).subscribe(result => {
      expect(result).toEqual({ success: true });
    });

    expect(mockHttpService.patchGeneric).toHaveBeenCalledWith('cards/1/toggle');
  });

  it('deve chamar deleteGeneric ao deletar um card', () => {
    mockHttpService.deleteGeneric.and.returnValue(of({ success: true }));

    service.deleteCards(1).subscribe(result => {
      expect(result).toEqual({ success: true });
    });

    expect(mockHttpService.deleteGeneric).toHaveBeenCalledWith('cards/1');
  });
});
