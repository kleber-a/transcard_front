import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockAuthService: any;

  beforeEach(async () => {
    mockAuthService = {
      logout: jasmine.createSpy('logout')
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule, MatIconModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar AuthService.logout ao executar logout', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});
