import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AuthComponent implements OnInit {

  loginForm!: FormGroup;
  isLoading = signal(false);

  private fb = inject(FormBuilder)
  private router = inject(Router)
  private authService = inject(AuthService)



  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);

      this.authService.login(this.loginForm.value).subscribe({
        next: res => {
          this.isLoading.set(false);
           this.router.navigate(['/home']);
        },
        error: err => {
          this.isLoading.set(false);
        }
      })
    }
  }

}
