import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconComponent } from "../icon/icon.component";
import { LoginCredentials } from '../../types/auth.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [IconComponent, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  formLogin: FormGroup;

  loginError: boolean = false;

  constructor(private fb: FormBuilder) {

    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.formLogin.invalid) {
      console.log("Invalid Form...see msg.")
      return;
    }
    this.loginError = false;
    const credentials: LoginCredentials = {
      username: this.formLogin.get('username')?.value,
      password: this.formLogin.get('password')?.value,
    }
    this.authService.login(credentials).subscribe({
      next: response => {
        this.authService.setUserStorage(response);
        this.router.navigate(['/'])
      },
      error: err => {
        console.error("Error login", err);
        this.loginError = true;
      }
    })
  }

}
