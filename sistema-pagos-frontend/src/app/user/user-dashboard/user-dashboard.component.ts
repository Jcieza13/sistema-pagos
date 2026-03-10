import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagosService } from '../../services/pagos.service';
import { AuthService } from '../../services/auth.service';
import { Pago, PaymentStatus } from '../../models/pago.model';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true, // 👈 Angular 17 standalone
  imports: [
    [CommonModule], 
    RouterModule,    
    MatCardModule,
    MatButtonModule,
    MatListModule,
    CurrencyPipe,
    DatePipe,
    NgFor   // 👈 necesario para *ngFor
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  deudaPendiente: number = 0;
  ultimosPagos: Pago[] = [];

  constructor(
    private pagosService: PagosService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const codigo = this.authService.codigoEstudiante;

    if (codigo) {
      this.pagosService.getPagosDeEstudiante(codigo).subscribe(pagos => {
        this.ultimosPagos = pagos.slice(0, 3);
        this.deudaPendiente = this.calcularDeuda(pagos);
      });
    } else {
      console.warn('No se encontró código de estudiante en sesión');
    }
  }

  calcularDeuda(pagos: Pago[]): number {
    return pagos
      .filter(p => p.estado === PaymentStatus.CREADO || p.estado === PaymentStatus.RECHAZADO)
      .reduce((acc, p) => acc + p.monto, 0);
  }
}