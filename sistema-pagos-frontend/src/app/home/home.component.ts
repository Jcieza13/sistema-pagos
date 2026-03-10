import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';   // 👈 importar RouterModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    RouterModule   // 👈 añadir aquí para que funcione routerLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}