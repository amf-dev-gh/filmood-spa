import { Component, inject } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterUser } from '../../types/auth.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-singup',
  imports: [IconComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './singup.component.html'
})
export class SingupComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  formSingup: FormGroup;

  errorMsg:string = '';

  constructor(private fb: FormBuilder) {
    this.formSingup = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?:[A-Za-z]{3,}\s+){1,}[A-Za-z]{3,}$/)
        ]
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+$/)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
        ]
      ]
    });

  }

  singUp() {
    if (this.formSingup.invalid) {
      console.error("Invalid Form. See msg.");
      return;
    }
    const registerUser: RegisterUser = {
      fullName: this.formSingup.get('fullName')?.value,
      username: this.formSingup.get('username')?.value,
      password: this.formSingup.get('password')?.value
    }
    this.authService.singUp(registerUser).subscribe({
      next: response => {
        alert(`Se ha registrado con el usuario ${response.username} correctamente.`);
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error("SingUp Error", err)
        if(err.status === 409){
          this.errorMsg = 'El nombre de usuario ya existe.'
        }else {
          this.errorMsg = 'Error al crear cuenta. Intente nuevamente mas tarde.'
        }
      }
    })
  }

}
