import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string | undefined;
  roles: string[] = [];
  codigoEstudiante: string | undefined; // 👈 nuevo campo

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.username;
    this.roles = this.authService.roles;
    this.codigoEstudiante = this.authService.codigoEstudiante; // 👈 obtener código
  }

  getRolPrincipal(): string {
    if (this.roles.includes('ADMIN')) {
      return 'Administrador';
    } else if (this.roles.includes('USER')) {
      return 'Usuario';
    } else if (this.roles.includes('ESTUDIANTE')) {
      return 'Estudiante';
    }
    return 'Invitado';
  }
}