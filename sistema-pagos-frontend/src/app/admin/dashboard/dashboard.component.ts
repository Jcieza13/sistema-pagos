import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EstudiantesService } from '../../services/estudiantes.service';
import { PagosService } from '../../services/pagos.service';
import { Pago, PaymentStatus } from '../../models/pago.model';
import { Estudiante } from '../../models/estudiante.model';

// 👉 Importar Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  titulo = 'Panel de Administración';
  descripcion = 'Bienvenido al sistema de pagos. Desde aquí puedes gestionar estudiantes y pagos.';

  totalEstudiantes = 0;
  pagosPendientes = 0;  // CREADO
  pagosAprobados = 0;   // VALIDADO
  pagosRechazados = 0;  // RECHAZADO

  constructor(
    private estudiantesService: EstudiantesService,
    private pagosService: PagosService
  ) {}

  ngOnInit(): void {
    // Total estudiantes
    this.estudiantesService.getAllEstudiantes().subscribe((data: Estudiante[]) => {
      this.totalEstudiantes = data.length;
    });

    // Pagos por estado
    this.pagosService.getAllPagos().subscribe((data: Pago[]) => {
      this.pagosPendientes = data.filter(p => p.estado === PaymentStatus.CREADO).length;
      this.pagosAprobados = data.filter(p => p.estado === PaymentStatus.VALIDADO).length;
      this.pagosRechazados = data.filter(p => p.estado === PaymentStatus.RECHAZADO).length;
    });
  }
}