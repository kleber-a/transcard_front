import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCardModalComponent } from './create-card-modal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('CreateCardModalComponent', () => {
  let component: CreateCardModalComponent;
  let fixture: ComponentFixture<CreateCardModalComponent>;

  let mockDialogRef: any;

  beforeEach(async () => {
    mockDialogRef = {
      close: jasmine.createSpy('close')
    };

    await TestBed.configureTestingModule({
      imports: [CreateCardModalComponent], // standalone → usar imports
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { userName: 'Teste' } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário vazio com valores padrão', () => {
    expect(component.form.value).toEqual({
      cardNumber: '',
      cardName: '',
      cardType: 'COMUM'
    });
  });

  it('não deve fechar o diálogo se o formulário for inválido', () => {
    component.form.controls['cardNumber'].setValue('');
    component.submit();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('deve fechar o diálogo com os dados do formulário quando submit for válido', () => {
    component.form.controls['cardNumber'].setValue('123456');
    component.form.controls['cardName'].setValue('Cartão Teste');
    component.form.controls['cardType'].setValue('TRABALHADOR');

    component.submit();

    expect(mockDialogRef.close).toHaveBeenCalledWith({
      cardNumber: '123456',
      cardName: 'Cartão Teste',
      cardType: 'TRABALHADOR'
    });
  });

  it('deve fechar o diálogo sem dados ao chamar close', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
