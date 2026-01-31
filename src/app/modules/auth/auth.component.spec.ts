import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule]
})
export class AuthComponent implements OnInit {

  loginForm!: FormGroup;
  isLoading = signal(false);
  hidePassword = true;


  #fb = inject(FormBuilder)
  #router = inject(Router)
  #authService = inject(AuthService)
  #toastr = inject(ToastrService)



  ngOnInit(): void {
    this.loginForm = this.#fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  navRegister() {
    this.#router.navigate(['/register']);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);

      this.#authService.login(this.loginForm.value).subscribe({
        next: res => {
          this.isLoading.set(false);
          this.#toastr.success('Login efetuado com sucesso!', 'Sucesso');
          if(res.user.role === 'ADMIN') {
            this.#router.navigate(['/home']);
          } else {
            this.#router.navigate(['/user'], {
              queryParams: { user: JSON.stringify(res.user) }
            });
          }

        },
        error: err => {
          this.#toastr.error('Usuário ou senha inválidos!', 'Erro');
          this.isLoading.set(false);
        }
      })
    }
  }

}
