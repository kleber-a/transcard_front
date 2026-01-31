import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatIconModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  hidePassword = true;
  hidePasswordRepeat = true;

  #authService = inject(AuthService)
  #toastr = inject(ToastrService)
  #fb = inject(FormBuilder);


ngOnInit(): void {
  this.registerForm = this.#fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    role: ['USER', [Validators.required]]
  }, { validators: this.passwordMatchValidator });
}

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) return null;

    if (confirmPassword.value && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      if (confirmPassword.hasError('mismatch')) {
        confirmPassword.setErrors(null);
      }
    }

    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;

    const payload: any = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      role: this.registerForm.get('role')?.value
    }

      this.#authService.register(payload).subscribe({
        next: res => {
          this.#toastr.success('Usuário criado!', 'Sucesso');
          this.isLoading = false;
        },
        error: err => {
          this.#toastr.error(err.error.message, 'Erro');
           this.isLoading = false;
        }
      })


    }
  }
}
