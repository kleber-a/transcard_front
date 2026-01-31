import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CardsComponent } from './cards.component';
import { CardsService } from '../../../services/cards.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { CardTable } from '../../../../core/models/Card';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  let mockCardsService: any;
  let mockToastr: any;

  beforeEach(async () => {
    mockCardsService = {
      getCards: jasmine.createSpy('getCards').and.returnValue(of({ content: [], totalPages: 0 }))
    };

    mockToastr = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    await TestBed.configureTestingModule({
      imports: [CardsComponent],
      providers: [
        { provide: CardsService, useValue: mockCardsService },
        { provide: ToastrService, useValue: mockToastr }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os cards ao inicializar', () => {
    expect(mockCardsService.getCards).toHaveBeenCalled();
  });

  it('deve atualizar os filtros e buscar cards', () => {
    component.filterName = 'Teste';
    component.filterType = 'COMUM';
    component.filterStatus = true;
    component.onFilterChange();

    expect(mockCardsService.getCards).toHaveBeenCalledWith({
      page: component.page,
      size: component.size,
      name: 'Teste',
      typeCard: 'COMUM',
      status: true
    });
  });

  it('deve alterar a página e buscar os cards correspondentes', () => {
    component.onPageChange(2);
    expect(component.page).toBe(2);
    expect(mockCardsService.getCards).toHaveBeenCalledWith({
      page: 2,
      size: component.size,
      name: component.filterName || undefined,
      typeCard: component.filterType || undefined,
      status: component.filterStatus
    });
  });

  // it('deve exibir erro ao falhar ao carregar cards', fakeAsync(() => {
  //   mockCardsService.getCards.and.returnValue(of({}).pipe(() => { throw new Error('Falha'); }));
  //   component.getDataCards();
  //   tick();
  //   expect(mockToastr.error).toHaveBeenCalledWith('Error ao listar cards!', 'Erro');
  // }));
});
