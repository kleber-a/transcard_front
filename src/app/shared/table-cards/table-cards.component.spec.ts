import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TableCardsComponent } from './table-cards.component';
import { CardsService } from '../../modules/services/cards.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { CardTable } from '../../core/models/Card';

describe('TableCardsComponent', () => {
  let component: TableCardsComponent;
  let fixture: ComponentFixture<TableCardsComponent>;

  let mockCardsService: any;
  let mockToastr: any;

  beforeEach(async () => {
    mockCardsService = {
      patchCards: jasmine.createSpy('patchCards').and.returnValue(of({}))
    };
    mockToastr = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    await TestBed.configureTestingModule({
      imports: [TableCardsComponent], // Standalone → usar imports
      providers: [
        { provide: CardsService, useValue: mockCardsService },
        { provide: ToastrService, useValue: mockToastr }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir changePage quando goToPage for chamado com página válida', () => {
    spyOn(component.changePage, 'emit');
    component.totalPages = 5;
    component.goToPage(2);
    expect(component.changePage.emit).toHaveBeenCalledWith(2);
  });

  it('não deve emitir changePage para páginas inválidas', () => {
    spyOn(component.changePage, 'emit');
    component.totalPages = 3;
    component.goToPage(-1);
    component.goToPage(3);
    expect(component.changePage.emit).not.toHaveBeenCalled();
  });

  it('deve chamar goToPage ao avançar página', () => {
    spyOn(component, 'goToPage');
    component.paginaAtual = 1;
    component.nextPage();
    expect(component.goToPage).toHaveBeenCalledWith(2);
  });

  it('deve chamar goToPage ao retroceder página', () => {
    spyOn(component, 'goToPage');
    component.paginaAtual = 1;
    component.prevPage();
    expect(component.goToPage).toHaveBeenCalledWith(0);
  });

  it('deve retornar um array correto de páginas', () => {
    component.totalPages = 4;
    expect(component.pagesArray()).toEqual([0, 1, 2, 3]);
  });

  it('deve retornar a classe correta para os badges por tipo', () => {
    expect(component.getBadgeClass('TRABALHADOR')).toContain('text-green-500');
    expect(component.getBadgeClass('COMUM')).toContain('text-gray-400');
    expect(component.getBadgeClass('ESTUDANTE')).toContain('text-cyan-500');
    expect(component.getBadgeClass('DESCONHECIDO')).toBe('px-3 py-1 rounded-full text-xs font-medium ');
  });

  it('deve retornar a classe correta para os badges de status', () => {
    expect(component.getBadgeClassStatus(true)).toContain('text-green-400');
    expect(component.getBadgeClassStatus(false)).toContain('text-gray-500');
  });

  it('deve retornar o rótulo correto do status', () => {
    expect(component.getLabelStatus(true)).toBe('Ativo');
    expect(component.getLabelStatus(false)).toBe('Inativo');
  });

  it('deve alternar o status do card e chamar cardsService.patchCards', fakeAsync(() => {
    const card: CardTable = { id: 1, status: false } as CardTable;
    component.toggleStatus(card);
    tick();
    expect(card.status).toBe(true);
    expect(mockCardsService.patchCards).toHaveBeenCalledWith(1);
    expect(mockToastr.success).toHaveBeenCalledWith('Status editado com sucesso!', 'Sucesso');
  }));

  it('deve chamar toastr.error se patchCards falhar', fakeAsync(() => {
    mockCardsService.patchCards.and.returnValue(throwError(() => new Error('falha')));
    const card: CardTable = { id: 1, status: false } as CardTable;
    component.toggleStatus(card);
    tick();
    expect(mockToastr.error).toHaveBeenCalledWith('Error ao editar status!', 'Erro');
  }));

  it('não deve chamar patchCards se card.id for indefinido', () => {
    const card: CardTable = { status: false } as CardTable;
    component.toggleStatus(card);
    expect(mockCardsService.patchCards).not.toHaveBeenCalled();
  });
});
