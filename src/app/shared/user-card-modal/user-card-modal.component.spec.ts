import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserCardModalComponent } from './user-card-modal.component';
import { UsersService } from '../../modules/services/users.service';
import { CardsService } from '../../modules/services/cards.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { User } from '../../core/models/User';
import { Card } from '../../core/models/Card';

describe('UserCardModalComponent', () => {
  let component: UserCardModalComponent;
  let fixture: ComponentFixture<UserCardModalComponent>;

  let mockUsersService: any;
  let mockCardsService: any;
  let mockToastr: any;
  let mockDialog: any;

  beforeEach(async () => {
    mockUsersService = { patchUsers: jasmine.createSpy('patchUsers').and.returnValue(of({})) };
    mockCardsService = {
      postCards: jasmine.createSpy('postCards').and.returnValue(of({})),
      patchCards: jasmine.createSpy('patchCards').and.returnValue(of({})),
      deleteCards: jasmine.createSpy('deleteCards').and.returnValue(of({}))
    };
    mockToastr = { success: jasmine.createSpy('success'), error: jasmine.createSpy('error') };
    mockDialog = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of({ name: 'Test', email: 'test@test.com', id: 1 })
      })
    };

    await TestBed.configureTestingModule({
      imports: [UserCardModalComponent],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: CardsService, useValue: mockCardsService },
        { provide: ToastrService, useValue: mockToastr },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit isOpenChange on close', () => {
    spyOn(component.isOpenChange, 'emit');
    component.close();
    expect(component.isOpenChange.emit).toHaveBeenCalled();
  });

  it('should emit onDeleteUser on deleteUser', () => {
    spyOn(component.onDeleteUser, 'emit');
    const user: User = { id: 1, name: 'Test', email: 'test@test.com' } as User;
    component.deleteUser(user);
    expect(component.onDeleteUser.emit).toHaveBeenCalledWith(1);
  });

  it('should call goToPage in nextPage', () => {
    spyOn(component, 'goToPage');
    component.paginaAtual = 1;
    component.nextPage();
    expect(component.goToPage).toHaveBeenCalledWith(2);
  });

  it('should call goToPage in prevPage', () => {
    spyOn(component, 'goToPage');
    component.paginaAtual = 1;
    component.prevPage();
    expect(component.goToPage).toHaveBeenCalledWith(0);
  });

  it('should call usersService.patchUsers when openEditUser is called', fakeAsync(() => {
    const user: User = { id: 1, name: 'Old', email: 'old@test.com' } as User;
    component.openEditUser(user);
    tick();
    expect(mockUsersService.patchUsers).toHaveBeenCalledWith(
      { name: 'Test', email: 'test@test.com' },
      1
    );
    expect(mockToastr.success).toHaveBeenCalledWith('Usuário Editado com sucesso!', 'Sucesso');
  }));

  it('should call cardsService.patchCards in setCardStatus', () => {
    const card: Card = { id: 1, status: false } as Card;
    component.setCardStatus(card);
    expect(mockCardsService.patchCards).toHaveBeenCalledWith(1);
    expect(mockToastr.success).toHaveBeenCalledWith('Status editado com sucesso!', 'Sucesso');
  });
});
