import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup<{ email: FormControl<string | null>; password: FormControl<string | null>; }>;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value as { email: string; password: string };
      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.errorMessage = 'ログインに失敗しました。メールアドレスまたはパスワードが間違っています。';
          console.error('Login failed', error);
        }
      });
    } else {
      this.errorMessage = '入力内容に不備があります。';
    }
  }
}
