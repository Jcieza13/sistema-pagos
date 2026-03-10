import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Servicio de autenticación
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.snackBar.open('Por favor completa todos los campos ⚠️', 'Cerrar', { duration: 3000 });
      return;
    }

    const { username, password } = this.loginForm.value;
    const auth = this.authService.login(username, password);

    if (auth) {
      console.log('Login correcto, roles:', this.authService.roles);

      if (this.authService.isAdmin()) {
        this.router.navigate(['/admin']); // → /admin/dashboard
      } else if (this.authService.isUser()) {
        this.router.navigate(['/user']);  // → /user/dashboard
      } else {
        this.router.navigate(['/profile']);
      }

      this.snackBar.open('Bienvenido 👋', 'Cerrar', { duration: 3000 });
    } else {
      this.snackBar.open('Usuario o contraseña incorrectos ❌', 'Cerrar', { duration: 3000 });
    }
  }
}